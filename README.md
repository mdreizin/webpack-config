[![NPM version](http://img.shields.io/npm/v/webpack-config.svg?style=flat-square)](https://www.npmjs.org/package/webpack-config) [![Travis build status](http://img.shields.io/travis/mdreizin/webpack-config/es6.svg?style=flat-square)](https://travis-ci.org/mdreizin/webpack-config) [![AppVeyor build status](https://img.shields.io/appveyor/ci/mdreizin/webpack-config/es6.svg?style=flat-square)](https://ci.appveyor.com/project/mdreizin/webpack-config/branch/es6) [![Code Climate GPA](https://img.shields.io/codeclimate/github/github/mdreizin/webpack-config.svg?style=flat-square)](https://codeclimate.com/github/mdreizin/webpack-config) [![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/github/mdreizin/webpack-config.svg?style=flat-square)](https://codeclimate.com/github/mdreizin/webpack-config) [![Dependency Status](https://img.shields.io/david/mdreizin/webpack-config.svg?style=flat-square)](https://david-dm.org/mdreizin/webpack-config) [![Development Dependency Status](https://img.shields.io/david/dev/mdreizin/webpack-config.svg?style=flat-square)](https://david-dm.org/mdreizin/webpack-config#info=devDependencies)

[webpack](https://github.com/webpack/webpack)-config
====================================================

Helps to load, extend and merge webpack configs

<h2 id="samples">Samples</h2>

`webpack.config.js`

```javascript
import {
    Config,
    ConfigEnvironment
} from 'webpack-config';

ConfigEnvironment.INSTANCE.setAll({
    env: () => process.env.WEBPACK_ENV || process.env.NODE_ENV
});

export default new Config().extend('./conf/webpack.[env].config.js');

```

`webpack.base.config.js`

```javascript
import path from 'path';
import BowerPlugin from 'bower-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ComponentPlugin from 'component-webpack-plugin';
import Config from 'webpack-config';

export default new Config().merge({
    output: {
        filename: '[name].js'
    },
    resolve: {
        root: [
            __dirname,
            path.join(__dirname, 'src', 'main', 'assets')
        ],
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'custom_components'
        ]
    },
    plugins: [
        new ComponentPlugin(),
        new BowerPlugin({
            excludes: [
                /.*\.min.*/
            ]
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /.*\.min.css/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.png$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.jpg$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.gif$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.woff$/,
            loader: 'url-loader?prefix=font/&limit=5000'
        }, {
            test: /\.eot$/,
            loader: 'file-loader?prefix=font/'
        }, {
            test: /\.ttf$/,
            loader: 'file-loader?prefix=font/'
        }, {
            test: /\.svg$/,
            loader: 'file-loader?prefix=font/'
        }]
    }
});

```

`webpack.dev.config.js`

```javascript
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

```

`webpack.prod.config.js`

```javascript
import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend({
    './conf/webpack.dev.config.js': config => {
        delete config.debug;
        delete config.devtool;
        delete config.output.pathinfo;

        return config;
    }
}).merge({
    filename: __filename,
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

```
