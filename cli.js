import process from "node:process";
import { queryTree } from "./query-macros.js";

const root = process.argv[2];
const result = await queryTree(root);
console.log(JSON.stringify(result, null, "  "));
