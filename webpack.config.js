var path = require("path");

module.exports = {
    context: __dirname,
    entry: "./public/scripts/main.js",
    output: {
        path: path.resolve(__dirname, './public/scripts'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};
