import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-import-css";
import pkg from "./package.json" with { type: "json" };

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/index.js",
  output: [
    { file: pkg.module, format: "es" },
    { file: pkg.main, format: "umd", name },
  ],
  external: ["svelte/internal", "svelte/store", "svelte/internal/disclose-version", "svelte/internal/client", "svelte/legacy"],
  plugins: [svelte(), resolve(), css()],
};
