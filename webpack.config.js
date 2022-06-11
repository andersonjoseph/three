const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
	test: /\.tsx?$/,
	use: 'ts-loader',
	exclude: /node_modules/,
      },
      {
	test: /\.css$/i,
	use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
	test: /\.(glsl|vs|fs)$/,
	loader: 'ts-shader-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin(),
  ],
};

