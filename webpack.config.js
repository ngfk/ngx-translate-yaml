const path              = require('path');
const fs                = require('fs');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let languages = fs.readdirSync(path.join(__dirname, 'src', 'i18n')).map(file => {
    return path.join(__dirname, 'src', 'i18n', file);
});

module.exports = {

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js', '.css'],
        alias: {
            'app': path.join(__dirname, 'src')
        }
    },

    entry: {
        i18n: [...languages],
        vendor: [
            'core-js/es6',
            'core-js/es7/reflect',
            'zone.js/dist/zone'
        ],
        main: path.join(__dirname, 'src', 'main.ts')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
    },
    
    module: {
        rules: [
            { test: /\.ts$/,   use: ['awesome-typescript-loader'] },
            {
                test: /\.ya?ml$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'assets/i18n/[name].json' }
                    },
                    {
                        loader: 'yaml-import-loader',
                        options: { importRoot: true, output: 'json' }
                    }
                ],
                include: path.join(__dirname, 'src', 'i18n')
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'] }),
        new HtmlWebpackPlugin({
            base: process.env.NODE_ENV === 'production'
                ? '/ngx-translate-yaml'
                : '/',
            template: path.join(__dirname, 'src', 'index.ejs')
        }),

        // Provide context to Angular's use of System.import
        // https://github.com/angular/angular/issues/11580
        // https://github.com/angular/angular/issues/14898 (modification for angular 4)
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'src'),
            { } // Routes, if any
        ),
    ],
    
    devServer: {
        port: 9000,
        contentBase: './src'
    }
}
