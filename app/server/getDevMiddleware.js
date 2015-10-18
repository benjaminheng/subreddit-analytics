import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

export default function getDevMiddleware() {
    // Use this middleware to set up hot module reloading via webpack.
    const compiler = webpack(webpackConfig);
    return [
        webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }),
        webpackHotMiddleware(compiler)
    ]
}