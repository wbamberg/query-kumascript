import fs from "node:fs";
import path from "node:path";

import * as Parser from "./parser.js";

function normalizeMacroName(name) {
  return name.replace(/:/g, "-").toLowerCase();
}

function querySource(source) {
  const tokens = Parser.parse(source);
  const macroInvocations = tokens.filter((token) => token.type === "MACRO");
  const result = macroInvocations.map((macroInvocation) => {
    return {
      name: normalizeMacroName(macroInvocation.name),
      args: macroInvocation.args,
    };
  });
  return result;
}

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

export async function queryTree(root) {
  const result = [];
  for (const file of walkSync(root)) {
    if (file.endsWith("index.md")) {
      const contents = fs.readFileSync(file, { encoding: "utf8" });
      const macros = querySource(contents);
      result.push({
        file,
        macros,
      });
    }
  }
  return result;
}
