const path = require("path");
const dotenv = require("dotenv");

const envResult = dotenv.config();

if (envResult.error) {
  console.error("Failed to load environment variables from .env file");
  throw envResult.error;
}

module.exports = {
  entry: "./todo.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
    },
  },
  devServer: {
    client: {
      logging: "info",
    },
    static: {
      directory: path.join(__dirname, "/"),
    },
    hot: true,
    bonjour: true,
    compress: true,
    port: 8080,
  },
};
