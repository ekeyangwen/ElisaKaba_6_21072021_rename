const path = require("path");
const config = require("./config.json");

module.exports = {
  entry: ["./src/index.js, ./src/pagesPhotographes.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./main.js",
  },
};
