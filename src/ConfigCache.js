import {
    isUndefined,
} from 'lodash';
import ConfigStrategyList from './ConfigStrategyList';
import DEFAULT_RESOLVERS from './ConfigCacheResolvers';

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
 * @extends {Map}
 */
class ConfigCache extends Map {
    /**
     * @constructor
     * @param {ConfigEnvironment} environment
     * @param {Function[]} [valueResolvers]
     */
    constructor(environment, valueResolvers = DEFAULT_RESOLVERS) {
        super();

        ENVIRONMENT.set(this, environment);
        VALUE_RESOLVERS.set(this, ConfigStrategyList.from(valueResolvers));
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
     * @override
     */
    get(key) {
        let value;

        if (this.persistent) {
            if (!this.has(key)) {
                value = require(key);

                this.set(key, value);
            } else {
                value = super.get(key);
            }
        } else {
            delete require.cache[key];

            value = require(key);
        }

        return this.valueResolvers.resolve(value, x => !isUndefined(x));
    }
}

export default ConfigCache;
