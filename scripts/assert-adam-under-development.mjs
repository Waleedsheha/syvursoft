import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const adamPagePath = join(root, "src", "app", "adam", "page.tsx");
const productsPath = join(root, "src", "lib", "products.ts");

assert.equal(
  existsSync(adamPagePath),
  false,
  "ADAM route page should be removed",
);

const productsSource = readFileSync(productsPath, "utf8");
assert.match(
  productsSource,
  /id:\s*"adam"[\s\S]*?shortRole:\s*"Under development"/,
  "ADAM product card should show Under development",
);
assert.doesNotMatch(
  productsSource,
  /id:\s*"adam"[\s\S]*?href:\s*"\/adam"/,
  "ADAM product metadata should not link to /adam",
);

const sourceFiles = [];
const collectSourceFiles = (dir) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      collectSourceFiles(path);
      continue;
    }

    if (/\.(ts|tsx)$/.test(entry)) {
      sourceFiles.push(path);
    }
  }
};

collectSourceFiles(join(root, "src"));

const adamLinks = sourceFiles.filter((path) =>
  readFileSync(path, "utf8").includes('"/adam"'),
);

assert.deepEqual(
  adamLinks.map((path) => relative(root, path)),
  [],
  "Source should not contain hard-coded /adam links",
);
