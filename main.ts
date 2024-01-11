import { build } from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.3/mod.ts";
import { parseArgs } from "https://deno.land/std@0.211.0/cli/mod.ts";

async function main() {
  const parsedArgs = parseArgs(Deno.args, {
    string: ["input", "output"],
    collect: ["input"],
    alias: {
      input: ["i"],
      output: ["o"],
    },
  });
  const result = await build({
    plugins: [...denoPlugins()],
    bundle: true,
    entryPoints: parsedArgs.input,
    outfile: parsedArgs.output,
  });
  if (result.errors.length > 0 || result.warnings.length > 0) {
    console.log(result);
    Deno.exit(1);
  }

  Deno.exit();
}

if (import.meta.main) {
  main();
}
