import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./atlas-image.mjs", import.meta.url));
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function run(args, env) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], {
      env: { ...process.env, ...env },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

test("generates a 21:9 cover from a prompt file", async (t) => {
  let polls = 0;
  let submittedBody;
  let baseUrl;
  const server = http.createServer(async (request, response) => {
    if (request.method === "POST" && request.url === "/api/v1/model/generateImage") {
      let body = "";
      for await (const chunk of request) body += chunk;
      submittedBody = JSON.parse(body);
      assert.equal(request.headers.authorization, "Bearer test-key");
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ code: 200, data: { id: "cover-1", status: "created" } }));
      return;
    }
    if (request.url === "/api/v1/model/result/cover-1") {
      polls += 1;
      response.setHeader("content-type", "application/json");
      response.end(
        JSON.stringify(
          polls === 1
            ? { id: "cover-1", status: "processing", outputs: [] }
            : { data: { id: "cover-1", status: "completed", outputs: [`${baseUrl}/cover.png`] } },
        ),
      );
      return;
    }
    if (request.url === "/cover.png") {
      response.setHeader("content-type", "image/png");
      response.end(png);
      return;
    }
    response.writeHead(404).end();
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;

  const directory = await mkdtemp(join(tmpdir(), "atlas-handdrawn-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const promptFile = join(directory, "cover-prompt.txt");
  const output = join(directory, "cover.png");
  await writeFile(promptFile, "Chinese handdrawn technical cover\n", "utf8");

  const result = await run(
    ["--prompt-file", promptFile, "--output", output, "--role", "cover"],
    {
      ATLASCLOUD_API_KEY: "test-key",
      ATLASCLOUD_API_BASE_URL: `${baseUrl}/api/v1`,
      ATLASCLOUD_POLL_INTERVAL_MS: "1",
    },
  );

  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(submittedBody, {
    model: "bytedance/seedream-v5.0-lite",
    prompt: "Chinese handdrawn technical cover",
    size: "4704*2016",
    output_format: "png",
  });
  assert.deepEqual(await readFile(output), png);
  assert.equal(
    await readFile(join(directory, "cover.prompt.txt"), "utf8"),
    "Chinese handdrawn technical cover\n",
  );
  assert.equal(polls, 2);
});

test("requires an Atlas Cloud API key", async () => {
  const result = await run(["--prompt", "page", "--output", "/tmp/unused.png"], {
    ATLASCLOUD_API_KEY: "",
  });
  assert.equal(result.code, 1);
  assert.match(result.stderr, /ATLASCLOUD_API_KEY is required/);
});
