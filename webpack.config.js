const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const removeNewLine = (buffer) => {
  return buffer.toString().replace("\n", "");
};

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },

  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      //   { test: /\.js$/, use: `console.log("test")` },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "/dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000, //2kb
        },
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date :: ${new Date().toLocaleString()}
        Commit Version :: ${removeNewLine(
          childProcess.execSync("git rev-parse --short HEAD")
        )}
        Auth.name :: ${removeNewLine(
          childProcess.execSync("git config user.name")
        )}
        Auth.email :: ${removeNewLine(
          childProcess.execSync("git config user.email")
        )}
  `,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("https://www.naver.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "프로덕션",
      },
    }),
  ],
};
