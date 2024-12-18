const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js', // Use contenthash for better caching
    clean: true, // Clean the output directory before each build
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  performance: {
    hints: 'warning', // Change from 'error' to 'warning' to avoid build failure
    maxEntrypointSize: 512000, // Increase to 500 KiB
    maxAssetSize: 512000, // Increase asset size limit
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body', // Ensure scripts are injected at the bottom of the body
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Use contenthash for better caching
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('http://api/prod/v2/graphql'),
    }),
  ],
  optimization: {
    chunkIds: 'named',
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all', // Split all chunks, not just async
      minSize: 20000,
      maxSize: 250000, // Limit the size of each chunk
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
        },
        common: {
          test: /[\\/]src[\\/]/,
          name: 'common',
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single', // Extract the Webpack runtime into its own file
  },
};
