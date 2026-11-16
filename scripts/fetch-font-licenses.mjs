import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Run manually after changing the font library. No network is needed at build time.
// Pass a google/fonts commit SHA to reproduce a previous manifest exactly.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const library = await readFile(join(root, "lib/font-library.ts"), "utf8");
const fontIds = [...library.matchAll(/buildFont\(\{\s*id:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
if (!fontIds.length || new Set(fontIds).size !== fontIds.length) {
  throw new Error("Could not read unique font IDs from lib/font-library.ts");
}

const reference = process.argv.slice(2).find((argument) => !argument.startsWith("--")) ?? "main";
if (!/^(?:main|[a-f0-9]{40})$/.test(reference)) throw new Error("Expected main or a full google/fonts commit SHA");
const revision = reference === "main"
  ? await request("https://api.github.com/repos/google/fonts/commits/main").then((response) => response.json()).then((commit) => commit.sha)
  : reference;
const tree = await request(`https://api.github.com/repos/google/fonts/git/trees/${revision}?recursive=1`).then((response) => response.json());
if (tree.truncated || !Array.isArray(tree.tree)) throw new Error("Google Fonts tree is incomplete");
const paths = new Set(tree.tree.map((entry) => entry.path));
const outputDirectory = join(root, "public/fonts/licenses");
const results = new Map();
let nextIndex = 0;

const plan = fontIds.map((id) => {
  const family = id.replaceAll("-", "");
  const candidates = [
    { path: `ofl/${family}/OFL.txt`, name: "SIL Open Font License 1.1" },
    { path: `apache/${family}/LICENSE.txt`, name: "Apache License 2.0" },
    { path: `ufl/${family}/UFL.txt`, name: "Ubuntu Font License 1.0" },
  ];
  const candidate = candidates.find((item) => paths.has(item.path));
  if (!candidate) throw new Error(`No upstream license found for ${id}`);
  return { id, ...candidate, sourceUrl: `https://github.com/google/fonts/blob/${revision}/${candidate.path}` };
});
if (process.argv.includes("--plan")) {
  console.log(JSON.stringify({ revision, fonts: plan }));
  process.exit(0);
}

await mkdir(outputDirectory, { recursive: true });
await Promise.all(Array.from({ length: 6 }, async () => {
  while (nextIndex < fontIds.length) {
    const candidate = plan[nextIndex++];
    const { id, sourceUrl } = candidate;
    // --local uses licenses already fetched through the connected GitHub tool.
    const license = process.argv.includes("--local")
      ? await readFile(join(outputDirectory, `${id}.txt`), "utf8")
      : await request(`https://raw.githubusercontent.com/google/fonts/${revision}/${candidate.path}`).then((response) => response.text());
    if (license.length < 1000 || !/SIL OPEN FONT LICENSE|Apache License|UBUNTU FONT LICEN[CS]E/i.test(license)) throw new Error(`Invalid upstream license for ${id}`);
    await writeFile(join(outputDirectory, `${id}.txt`), license, "utf8");
    results.set(id, {
      name: candidate.name,
      path: `/fonts/licenses/${id}.txt`,
      sourceUrl,
      sha256: createHash("sha256").update(license).digest("hex"),
    });
  }
}));

const manifest = { revision, fonts: Object.fromEntries(fontIds.map((id) => [id, results.get(id)])) };
await writeFile(join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Saved ${fontIds.length} font licenses from google/fonts at ${revision}.`);

async function request(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "BubbleFontGenerator-license-sync" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response;
}
