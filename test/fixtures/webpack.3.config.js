import Config from '../../src';

export default new Config().merge({
    filename: __filename,
    tags: [
        'config3'
    ]
}).extend('./test/fixtures/webpack.5.config.js');
