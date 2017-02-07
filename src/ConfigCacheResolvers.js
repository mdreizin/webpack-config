import {
    get
} from 'lodash';

/**
 * @private
 * @type {String}
 */
const ES_MODULE_KEY = '__esModule';

export default [
    /**
     * @example `{ default: ..., __esModule: true }`
     * @param {*} value
     * @returns {*}
     */
    value => value && get(value, ES_MODULE_KEY, true) && value.default,

    /**
     * @param {*} value
     * @returns {*}
     */
    value => value
];
