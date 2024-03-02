# README

This package can be used to look for KumaScript macro invocations. It uses a copy of the [parser that's built into KumaScript itself](https://github.com/mdn/yari/blob/main/kumascript/src/parser.js), so it should be reliable.

Usage:

```js
import { queryTree } from "query-kumascript";

const root = process.argv[2];
const result = await queryTree(root);
console.log(JSON.stringify(result, null, "  "));
```

It has a single export, `queryTree()`, which takes as an argument a path. It looks for all "index.md" files under that path, and looks for KumaScript macro invocations in them.

It returns an array of objects, one for each file processed. Each object has two properties:

- `file`: the path to the file
- `macros`: an array of any macro invocations found. Each entry here is an object with two properties:
  - `name`: the normalized name of the macro (lower case, ":" converted to "-")
  - `args`: any arguments passed to the macro, as an array of strings
