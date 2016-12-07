import { resolve } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';

const APP_DIR = resolve(__dirname, '..', 'public', 'assets');
const BUILD_DIR = resolve(__dirname, '..', 'src');
const HTML_DIR = resolve(__dirname, '..', 'public');

module.exports = {
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : 'cheap-module-source-map',
    entry: resolve(BUILD_DIR, 'index.js'),
    plugins: [
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        colors: true,
        contentBase: HTML_DIR,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: false,
        open: true,
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
        }],
    },
    output: {
        filename: './assets/[name].bundle.js',
        path: APP_DIR,
    },
};
