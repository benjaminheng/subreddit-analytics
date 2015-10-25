var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './app/client/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist', 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    module: {
        // SCSS files: http://stackoverflow.com/questions/29210325/webpack-sass-where-is-the-css-file
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname,
            query: {
                optional: ['runtime'],
                stage: 2,
                env: {
                    development: {
                        plugins: [
                            'react-transform'
                        ],
                        extra: {
                            'react-transform': {
                                transforms: [{
                                    transform:  'react-transform-hmr',
                                    imports: ['react'],
                                    locals:  ['module']
                                }]
                            }
                        }
                    }
                }
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    }
};
