import {
    resolve
} from 'path';

/**
 * @private
 * @type {String}
 */
const MODULE_PREFIX = 'webpack-config';

export default [
    /**
     * `require('<module-name>')`
     * @param {String} value
     * @returns {String|Error}
     */
    value => {
        try {
            return require.resolve(value);
        } catch (err) {
            return err;
        }
    },

    /**
     * `require('webpack-config-<name>')`
     * @param {String} value
     * @returns {String|Error}
     */
    value => {
        try {
            return require.resolve(`${MODULE_PREFIX}-${value}`);
        } catch (err) {
            return err;
        }
    },

    /**
     * `path.resolve('<file-name>')`
     * @param {String} value
     * @returns {String}
     */
    value => resolve(value)
];
