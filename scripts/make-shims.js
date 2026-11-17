import { readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const ROOT = "src/data";

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith(".ts")) {
      const target = `vendor/dataset/src/data/${p.slice(ROOT.length + 1)}`;
      const from = "./" + relative(dirname(p), target).replaceAll("\\", "/");
      await writeFile(p, `export * from "${from}";\n`);
    }
  }
}
await walk(ROOT);
