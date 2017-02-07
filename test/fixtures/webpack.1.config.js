import Config from '../../src';

export default new Config().merge({
    tags: [
        'config1'
    ]
}).extend('./test/fixtures/webpack.2.config.js');
