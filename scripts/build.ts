/* ── The canonical build ──────────────────────────────────────────────────
   Emits docs/bundle.js and docs/styles.css (plus maps under --watch). GitHub
   Pages serves docs/ exactly as committed and there is no CI build, so any
   change under src/ must be rebuilt here and staged.

   `dev` is true only under --watch, so a one-shot build is a production
   build: read configs() for exactly what that switches. `npm run build` runs
   this script; `npm run dev` runs it with --watch. */
import * as esbuild from "esbuild";
import { spawn } from "node:child_process";

const watch = process.argv.includes("--watch");
const dev = watch; // --watch is the only dev build; one-shot is production

const configs = (): esbuild.BuildOptions[] => [
  {
    entryPoints: ["src/entry/main.ts"],
    outfile: "docs/bundle.js",
    bundle: true,
    format: "esm",
    target: "es2025",
    jsx: "automatic",
    sourcemap: dev,
    minify: !dev,
    define: { "process.env.NODE_ENV": dev ? '"development"' : '"production"' },
    logLevel: "info",
    alias: {
      "@manifestigations/dataset": new URL(
        "../vendor/dataset/src",
        import.meta.url,
      ).pathname,
    },
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
  /* One context per output: contexts are what make incremental rebuilds
     cheap, and every one must be disposed before the process can exit. */
  const contexts = await Promise.all(configs().map((c) => esbuild.context(c)));
  await Promise.all(contexts.map((c) => c.watch())); // one watcher, all outputs

  /* The dev server is a child process so that a crash in it does not take
     the watcher down with it. */
  const server = spawn(process.execPath, ["--watch", "server.ts"], {
    stdio: "inherit",
  });

  /* Guarded: SIGINT and SIGTERM can both arrive, and disposing an
     already-disposed context throws. */
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
