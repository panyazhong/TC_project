/**
 * Created by sunqun on 2017/12/18.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },{
                        loader: "css-loader",
                        options: {
                            modules: false,
                            localIndexName: '[name]__[local]--[hash:base64:5]'
                        }
                    },{
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
                //use: [
                //    {
                //        loader: 'raw-loader'
                //    },{
                //        loader: 'html-withimg-loader'
                //    }
                //]

            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
};