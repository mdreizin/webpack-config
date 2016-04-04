import Config from '../../src/Config';

export default new Config().merge({
    filename: __filename,
    tags: [
        'config3'
    ]
}).extend('./test/fixtures/webpack.5.config.js');
