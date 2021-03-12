import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default {
    input: "src/index.js",
    output: {
        file: "dist/excelBuilder-min.js",
        name: "ExcelBuilder",
        format: "cjs"
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            runtimeHelpers: true
        }),
        commonjs(),
        resolve(),
        uglify()
    ]
};
