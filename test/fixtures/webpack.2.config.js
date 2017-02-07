import Config from '../../src';

export default new Config().merge({
    tags: [
        'config2'
    ]
}).extend('./test/fixtures/webpack.3.config.js', './test/fixtures/webpack.4.config.js');
