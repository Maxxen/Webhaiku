var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    mode: "none",
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "env"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                include: SRC_DIR,
                loader: "style-loader"
            },
            {
                test: /\.css$/,
                include: SRC_DIR,
                loader: "css-loader",
                query: {
                    modules: true
                }
            }
        ]
    },
    resolve: {
      extensions: [".js", ".jsx"],
    }
}

module.exports = config;
