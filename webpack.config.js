var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/app.module.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', { module: false }]],
                        plugins: ['syntax-dynamic-import'],
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        }),
        new ngAnnotatePlugin({
            add: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ]
};