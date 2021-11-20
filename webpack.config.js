const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // plugin para manejar html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // plugin para manejar css iportado en js
const CopyPlugin = require('copy-webpack-plugin');  // para copiar archivos con webpack
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');  // para minimizar el css
const TerserPlugin = require('terser-webpack-plugin');  // para hashear los contenidos
const Dotenv = require('dotenv-webpack');  // para las variables  de entorno 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: "./src/index.js", // nombre de archivo de entrada
  output: { // directorio de salida y nombre de salida
    path: path.resolve(__dirname, "dist"), 
    filename: '[name].[contenthash].js', // esta modificacion es para que genere e archivo con hash para pisar el cache
    assetModuleFilename: 'assets/images/[hash][ext][query]' // config para las imagenes  y las fonts cada una en su directorio
  },

  resolve:{  // los archivos que debe leer
    extensions:['.js'],
    alias: {   // se pueden añadir alias para las rutas del 
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }

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
        },
        {  // este loader es para poder importar imagenes , quedan en base 64
          test: /\.png/,
          type: 'asset/resource'
        },
        { // este es para mover las fuents locales
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[ext]",
              outputPath: "./assets/fonts/", // a donde lo voy a llevar
              publicPath: "../assets/fonts/", // path publico 
              esModule: false,
            },
          }
        }
      ]
  },

  plugins: [ // plugin para el manejo de html
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({    
      filename: 'assets/[name].[contenthash].css'
    }), // plugin para css  en diferentes documentos  hasheados en esta configuracion
    new CopyPlugin({ // aqui le digo que archivos voy a mover
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),  // instancio  dot env 
    new CleanWebpackPlugin(),//  para limpiar el proyecto antes de enviar a prod
  ],

  optimization: {  // esta parte es para soporte de optimizacion para css y js 
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }


};
