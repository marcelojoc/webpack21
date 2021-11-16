const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // plugin para manejar html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // plugin para manejar css iportado en js
module.exports = {
  entry: "./src/index.js", // nombre de archivo de entrada
  output: { // directorio de salida y nombre de salida
    path: path.resolve(__dirname, "dist"), 
    filename: "main.js",
  },

  resolve:{  // los archivos que debe leer
    extensions:['.js']

  },

  module:{ // esto hace que babel transforme el Js  en codigo valido para cualquier navegador
    rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {  // para  reconocer los archivos css  o Stylus en este caso
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        }
      ]
  },

  plugins: [ // plugin para el manejo de html
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(), // plugin para css  en diferentes documentos
  ]


};
