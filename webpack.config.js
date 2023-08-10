const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const { sources } = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, "./src/"),
        },
        extensions: ['.vue', '.ts', '.tsx', '.jsx', '.js', '.json' ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                use: 'pug-plain-loader',  
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                  {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [
                            path.resolve(__dirname, 'src/assets/styles/foundation/_index.scss')
                        ],
                        // injector: (source, resources) => {
                        //     const combineAll = resources.map(({ content }) => content).join('')
                        //     // console.log('combine: ', source)
                        //     return combineAll + source;
                        // }
                    }
                  }
                ]
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        static: {
          directory: path.join(__dirname),
        },
        historyApiFallback: true,
        compress: true,
        port: 5050,
        hot: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
  };