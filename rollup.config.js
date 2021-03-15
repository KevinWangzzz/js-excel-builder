import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: {
        file: "dist/excelBuilder-min.js",
        name: "ExcelBuilder",
        format: "cjs",
        exports: "named"
    },
    plugins: [
        commonjs({ transformMixedEsModules: true }),
        babel({
            babelHelpers: "runtime",
            exclude: "node_modules/**",
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            browsers: ["last 2 version", "ie 11"]
                        }
                    }
                ]
            ],
            plugins: [
                ["@babel/plugin-transform-runtime", { helpers: true, regenerator: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
        }),
        nodePolyfills(),
        nodeResolve({ preferBuiltins: false }),
        terser()
    ],
    external: ["xlsx", "buffer-from"]
};
