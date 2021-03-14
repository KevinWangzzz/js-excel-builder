import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

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
                ["@babel/plugin-transform-runtime", { helpers: false, regenerator: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
        }),
        commonjs({ transformMixedEsModules: true }),
        resolve({ extensions: [".js"] }),
        terser()
    ]
};
