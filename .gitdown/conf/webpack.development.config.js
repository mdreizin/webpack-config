import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
    debug: true,
    devtool: '#source-map',
    output: {
        pathinfo: true
    },
    entry: {
        app: [
            'src/index.js',
            'src/index.less'
        ],
        vendor: [
            'lodash'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
});
