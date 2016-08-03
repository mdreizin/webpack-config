import Config from 'webpack-config';

export default new Config().extend(
    'mdreizin/base',
    'mdreizin/css',
    'mdreizin/html',
    'webpack-config-mdreizin/json'
    // etc
);
