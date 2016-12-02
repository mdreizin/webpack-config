import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend({
    'conf/webpack.development.config.js': config => {
        delete config.debug;
        delete config.devtool;
        delete config.output.pathinfo;

        return config;
    }
}).merge({
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ]
});
