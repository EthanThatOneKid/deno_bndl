import { build } from "https://deno.land/x/esbuild@v0.19.11/mod.js";
import { parseArgs } from "https://deno.land/std@0.210.0/cli/mod.ts";

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
    bundle: true,
    entryPoints: parsedArgs.input,
    outfile: parsedArgs.output,
  });
  console.log(result);
  Deno.exit();
}

if (import.meta.main) {
  main();
}
