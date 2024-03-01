import * as Parser from "./parser.js";

const input = process.argv[2];

export function normalizeMacroName(name) {
  return name.replace(/:/g, "-").toLowerCase();
}

export function queryMacros(source) {
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
