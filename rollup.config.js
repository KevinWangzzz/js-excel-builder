import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
    input: "./src/index.js",
    output: {
        file: "bundle.js",
        dir: "public",
        format: "umd"
    },
    plugins: [commonjs(), resolve()]
};
