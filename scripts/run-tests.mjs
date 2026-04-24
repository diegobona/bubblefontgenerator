import { rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";

const outDir = join(tmpdir(), "bubble-font-generator-tests");
const testFiles = [
  "tests/ai-style-assist.test.ts",
  "tests/download-background.test.ts",
  "tests/font-library.test.ts",
  "tests/svg-font-face.test.ts",
  "tests/editor-sizing.test.ts",
];

rmSync(outDir, { force: true, recursive: true });

run("npx", [
  "tsc",
  ...testFiles,
  "--module",
  "commonjs",
  "--target",
  "es2020",
  "--moduleResolution",
  "node",
  "--esModuleInterop",
  "--skipLibCheck",
  "--outDir",
  outDir,
]);

for (const file of testFiles) {
  run("node", [join(outDir, file.replace(/\.ts$/, ".js"))]);
}

function run(command, args) {
  if (process.platform === "win32" && command === "npx") {
    const result = spawnSync("cmd.exe", ["/d", "/s", "/c", [command, ...args].join(" ")], {
      stdio: "inherit",
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }

    return;
  }

  const result = spawnSync(command, args, {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
