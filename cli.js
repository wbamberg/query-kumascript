import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { queryMacros } from "./query-macros.js";

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

async function queryMDN() {
  const result = [];
  const root = process.argv[2];
  for (const file of walkSync(root)) {
    if (file.endsWith("index.md")) {
      const contents = fs.readFileSync(file, { encoding: "utf8" });
      const macros = queryMacros(contents);
      result.push({
        file,
        macros,
      });
    }
  }
  return result;
}

const result = await queryMDN();
console.log(JSON.stringify(result, null, "  "));
