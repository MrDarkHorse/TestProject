'use strict'
const webpack = require('webpack')
const path = require('path')

/*
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    context: path.resolve(CURRENT_WORKING_DIR, 'client'),
    entry: {
        app: [
            'webpack-hot-middleware/client', // bundle the client for hot reloading
            './main.js'  // the entry point of app
        ]
    },
    mode: 'development',
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, 'dist'), //  destination
        filename: 'client.bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NoEmitOnErrorsPlugin(),  // do not emit compiled assets that include errors
        new webpack.DefinePlugin({
          'process.env': {
            APP_HOST: JSON.stringify(process.env.APP_HOST),
            APP_PORT: JSON.stringify(process.env.APP_PORT),
            MYSQL_HOST: JSON.stringify(process.env.MYSQL_HOST),
            MYSQL_USER: JSON.stringify(process.env.MYSQL_USER),
            MYSQL_PASSWORD: JSON.stringify(process.env.MYSQL_PASSWORD),
            MYSQL_DATABASE: JSON.stringify(process.env.MYSQL_DATABASE),
            MYSQL_PORT: JSON.stringify(process.env.MYSQL_PORT),
            LOG_DIR: JSON.stringify(process.env.LOG_DIR),
            LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL),
            TOKEN_SECRET_KEY: JSON.stringify(process.env.TOKEN_SECRET_KEY)
          }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //check for all js files
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-function-bind', '@babel/plugin-proposal-class-properties'],
                },
            }
        ]
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devtool: "inline-source-map"
}

module.exports = config
