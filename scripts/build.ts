import { spawn } from "node:child_process";
import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");
const dev = watch; // watch implies dev build

const configs = (): esbuild.BuildOptions[] => [
  {
    entryPoints: ["src/entry/main.ts"],
    outfile: "docs/bundle.js",
    bundle: true,
    format: "esm",
    target: "es2022",
    jsx: "automatic",
    sourcemap: dev,
    minify: !dev,
    define: { "process.env.NODE_ENV": dev ? '"development"' : '"production"' },
    logLevel: "info",
  },
  {
    entryPoints: ["src/styles/index.css"],
    outfile: "docs/styles.css",
    bundle: true,
    sourcemap: dev,
    minify: !dev,
    logLevel: "info",
  },
];

if (!watch) {
  await Promise.all(configs().map((c) => esbuild.build(c)));
} else {
  const contexts = await Promise.all(configs().map((c) => esbuild.context(c)));
  await Promise.all(contexts.map((c) => c.watch())); // one watcher, all outputs

  const server = spawn(process.execPath, ["--watch", "server.ts"], {
    stdio: "inherit",
  });

  let closing = false;
  const shutdown = async () => {
    if (closing) return;
    closing = true;
    server.kill("SIGTERM");
    await Promise.all(contexts.map((c) => c.dispose()));
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
