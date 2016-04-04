import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('./conf/webpack.base.config.js').merge({
    filename: __filename,
    debug: true,
    devtool: '#source-map',
    output: {
        pathinfo: true
    },
    entry: {
        vendor: [
            'consolelog',
            'es5-shim',
            'es5-shim/es5-sham',
            'es6-shim',
            'es6-shim/es6-sham',
            'json3',
            'html5shiv',
            'html5shiv/dist/html5shiv-printshiv.js',
            'respond'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
});
