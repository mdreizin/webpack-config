import {
    isUndefined,
} from 'lodash';
import ConfigStrategyList from './ConfigStrategyList';
import DEFAULT_RESOLVERS from './ConfigCacheResolvers';

/**
 * @private
 * @type {WeakMap}
 */
const CACHE = new WeakMap();

/**
 * @private
 * @type {String}
 */
const PERSISTENT_KEY = 'WEBPACK_CONFIG_CACHE';

/**
 * @private
 * @type {WeakMap}
 */
const ENVIRONMENT = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const VALUE_RESOLVERS = new WeakMap();

/**
 * Please set `WEBPACK_CONFIG_CACHE` environment variable to `false` to make it non persistent or just use {@link ConfigCache#persistent}
 * @class
 */
class ConfigCache {
    /**
     * @constructor
     * @param {ConfigEnvironment} environment
     * @param {Function[]} [valueResolvers]
     */
    constructor(environment, valueResolvers = DEFAULT_RESOLVERS) {
        CACHE.set(this, new Map());
        ENVIRONMENT.set(this, environment);
        VALUE_RESOLVERS.set(this, new ConfigStrategyList(valueResolvers));
    }

    /**
     * @readonly
     * @type {ConfigEnvironment}
     */
    get environment() {
        return ENVIRONMENT.get(this);
    }

    /**
     * @type {Boolean}
     */
    get persistent() {
        return this.environment.getOrDefault(PERSISTENT_KEY, true) === true;
    }

    /**
     * @private
     * @readonly
     * @type {Map}
     */
    get cache() {
        return CACHE.get(this);
    }

    /**
     * @example
     * import {
     *   cache
     * } from 'webpack-config';
     *
     * cache.persistent = false;
     * @example
     * WEBPACK_CONFIG_CACHE=false ...
     * @param {Boolean} value
     */
    set persistent(value) {
        this.environment.set(PERSISTENT_KEY, value);
    }

    /**
     * @readonly
     * @type {ConfigStrategyList}
     */
    get valueResolvers() {
        return VALUE_RESOLVERS.get(this);
    }

    /**
     * @param {String} key
     * @returns {*}
     */
    get(key) {
        let value;

        if (this.persistent) {
            if (!this.cache.has(key)) {
                value = require(key);

                this.cache.set(key, value);
            } else {
                value = this.cache.get(key);
            }
        } else {
            delete require.cache[key];

            value = require(key);
        }

        return this.valueResolvers.resolve(value, x => !isUndefined(x));
    }
    /**
     * @param {String} key
     * @param {*} value
     * @returns {void}
     */
    set(key, value) {
        return this.cache.set(key, value);
    }
}

export default ConfigCache;
