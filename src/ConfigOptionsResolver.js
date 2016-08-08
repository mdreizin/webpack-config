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
const NAME_RESOLVER = new WeakMap();

/**
 * @class
 */
class ConfigOptionsResolver {
    /**
     * @constructor
     * @param {ConfigNameResolver} nameResolver
     */
    constructor(nameResolver) {
        NAME_RESOLVER.set(this, nameResolver);
    }

    /**
     * @readonly
     * @type {ConfigNameResolver}
     */
    get nameResolver() {
        return NAME_RESOLVER.get(this);
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
                parent[key] = this.nameResolver.resolve(node);
            }
        }

        return value;
    }
}

export default ConfigOptionsResolver;
