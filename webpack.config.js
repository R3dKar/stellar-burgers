const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

module.exports = function(_, argv) {
  const debug = argv.mode !== 'production';
  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.module\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.png'
      }),
      new HtmlWebpackPlugin({
        template: './public/404.html',
        favicon: './public/favicon.png',
        filename: '404.html'
      }),
      new Dotenv({ safe: true })
    ],
    resolve: {
      extensions: [
        '*',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.css',
        '.scss',
        '.png',
        '.svg',
        '.jpg'
      ],
      alias: {
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@ui-pages': path.resolve(__dirname, './src/components/ui/pages'),
        '@utils-types': path.resolve(__dirname, './src/utils/types'),
        '@api': path.resolve(__dirname, './src/utils/burger-api.ts'),
        '@slices': path.resolve(__dirname, './src/services/slices'),
        '@selectors': path.resolve(__dirname, './src/services/selectors'),
        '@src': path.resolve(__dirname, './src')
      }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: process.env.PUBLIC_PATH ?? '/',
    },
    devServer: {
      static: path.join(__dirname, './dist'),
      compress: true,
      historyApiFallback: true,
      port: 4000
    },
    mode: debug ? 'development' : 'production',
    devtool: debug ? 'source-map' : undefined,
  };
};
