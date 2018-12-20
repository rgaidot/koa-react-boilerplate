import config from 'config';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import { resolve } from 'path';
import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack';

const APP_DIR = resolve(__dirname, '..', 'public');
const BUILD_DIR = resolve(__dirname, '..', 'src');
const HTML_DIR = resolve(__dirname, '..', 'public');

module.exports = {
    devtool:
        process.env.NODE_ENV === 'development'
            ? 'eval'
            : 'cheap-module-source-map',
    entry: resolve(BUILD_DIR, 'index.js'),
    plugins: [
        new HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new DefinePlugin({
            appName: JSON.stringify(config.appName),
            version: JSON.stringify(config.version),
        }),
    ],
    devServer: {
        contentBase: HTML_DIR,
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true,
        quiet: true,
        host: '0.0.0.0',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: [
                        ['import', [{ libraryName: 'antd', style: true }]],
                    ],
                },
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader?sourceMap',
                    'less-loader?sourceMap',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
        ],
    },
    output: {
        filename: './assets/[name].bundle.js',
        path: APP_DIR,
    },
};
