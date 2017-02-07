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
     * @example `require('<module-name>')`
     * @param {String} value
     * @throws {Error}
     * @returns {String}
     */
    value => require.resolve(value),

    /**
     * @example `require('webpack-config-<name>')`
     * @param {String} value
     * @throws {Error}
     * @returns {String}
     */
    value => require.resolve(`${MODULE_PREFIX}-${value}`),

    /**
     * @example `path.resolve('<file-name>')`
     * @param {String} value
     * @returns {String}
     */
    value => resolve(value)
];
