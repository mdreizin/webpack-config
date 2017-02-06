[![NPM version](http://img.shields.io/npm/v/webpack-config.svg?style=flat-square)](https://www.npmjs.org/package/webpack-config)
[![Travis build status](http://img.shields.io/travis/Fitbit/webpack-config/master.svg?style=flat-square)](https://travis-ci.org/Fitbit/webpack-config)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/mdreizin/webpack-config/master.svg?style=flat-square)](https://ci.appveyor.com/project/mdreizin/webpack-config/branch/master)
[![Code Climate GPA](https://img.shields.io/codeclimate/github/Fitbit/webpack-config.svg?style=flat-square)](https://codeclimate.com/github/Fitbit/webpack-config)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/Fitbit/webpack-config.svg?style=flat-square)](https://codeclimate.com/github/Fitbit/webpack-config)
[![Dependency Status](https://img.shields.io/david/Fitbit/webpack-config.svg?style=flat-square)](https://david-dm.org/Fitbit/webpack-config)
[![Development Dependency Status](https://img.shields.io/david/dev/Fitbit/webpack-config.svg?style=flat-square)](https://david-dm.org/Fitbit/webpack-config#info=devDependencies)

# webpack-config
> Helps to load, extend and merge webpack configs

## Installation

```bash
npm install webpack-config --save-dev
```

or

```bash
yarn add webpack-config --dev
```

## Features

- [x] `#extend()` - Helps to extend config using local file or shareable config
- [x] `#merge()` - Helps to merge some values into config and overrides existing ones
- [x] `#defaults()` - Helps to add some values if they are missing
- [x] Supports `environment` variables under `#extend()`, `#merge()`, `#defaults()` methods
- [x] Supports `process.env.*` variables in addition to `environment` ones
- [x] Supports shareable configs via `node`-modules

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/Fitbit/webpack-config/releases) and also in the [wiki page](https://github.com/Fitbit/webpack-config/wiki/Changelog).

## Shareable Configs

You can publish your configs to `npm` using `webpack-config-` prefix for package name.

When you call `#extend()` method you may omit that prefix:

```javascript
import Config from 'webpack-config';

export default new Config().extend(
    'mdreizin/base',
    'mdreizin/css',
    'mdreizin/html',
    'webpack-config-mdreizin/json'
    // etc
);
```

Also I would recommend to add `webpack` and `webpack-config` keywords so other users can easily find your module.

## Usage

`./webpack.config.js`

```javascript
import Config, { environment } from 'webpack-config';

environment.setAll({
    env: () => process.env.NODE_ENV
});

// Also you may use `'conf/webpack.[NODE_ENV].config.js'`
export default new Config().extend('conf/webpack.[env].config.js');
```

`./conf/webpack.base.config.js`

```javascript
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
```

`./conf/webpack.development.config.js`

```javascript
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
```

`./conf/webpack.production.config.js`

```javascript
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
```
