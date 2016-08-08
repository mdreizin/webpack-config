import {
    isFunction,
    isString
} from 'lodash';
import RecursiveIterator from 'recursive-iterator';

/**
 * @function
 * @name ConfigTransform
 * @param {Config} config
 * @returns {Config|Object}
 */

/**
 * @typedef {Object|ConfigTransform} ConfigOptions
 */

/**
 * @private
 * @type {WeakMap}
 */
const STRING_RESOLVER = new WeakMap();

/**
 * @class
 */
class ConfigOptionsResolver {
    /**
     * @constructor
     * @param {ConfigStringResolver} stringResolver
     */
    constructor(stringResolver) {
        STRING_RESOLVER.set(this, stringResolver);
    }

    /**
     * @readonly
     * @type {ConfigStringResolver}
     */
    get stringResolver() {
        return STRING_RESOLVER.get(this);
    }

    /**
     * @private
     * @param {Config} config
     * @param {ConfigOptions} options
     * @returns {Object}
     */
    static valueOf(config, options) {
        return isFunction(options) ? options.call(config, config) : options;
    }

    /**
     * @param {Config} config
     * @param {ConfigOptions} options
     * @returns {Object}
     */
    resolve(config, options) {
        const value = ConfigOptionsResolver.valueOf(config, options);

        for (const {parent, node, key} of new RecursiveIterator(value, 1, true)) {
            if (isString(node)) {
                parent[key] = this.stringResolver.resolve(node);
            }
        }

        return value;
    }
}

export default ConfigOptionsResolver;
