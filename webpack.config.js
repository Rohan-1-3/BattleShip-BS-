const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    // devtool: "inline-source-map",
    path: path.resolve(__dirname, "project"),
  },
};