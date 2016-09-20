import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Config from 'webpack-config';

const extractCss = new ExtractTextPlugin('[name].css');

export default new Config().merge({
    output: {
        filename: '[name].js'
    },
    resolve: {
        root: [
            __dirname
        ],
        modulesDirectories: [
            'node_modules'
        ]
    },
    plugins: [
        extractCss
    ],
    module: {
        loaders: [{
            test: /\.less$/,
            loader: extractCss.extract('style', [
                'css',
                'less'
            ])
        }]
    }
});
