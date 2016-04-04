import Config from '../../src/Config';

export default new Config().merge({
    filename: __filename,
    tags: [
        'config2'
    ]
}).extend('./test/fixtures/webpack.3.config.js', './test/fixtures/webpack.4.config.js');
