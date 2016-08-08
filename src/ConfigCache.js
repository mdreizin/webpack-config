import {
    get
} from 'lodash';

/**
 * @private
 * @type {String}
 */
const PERSISTENT_KEY = 'WEBPACK_CONFIG_CACHE';

/**
 * @private
 * @type {String}
 */
const ES_MODULE_KEY = '__esModule';

/**
 * @private
 * @type {WeakMap}
 */
const ENVIRONMENT = new WeakMap();

/**
 * Please set `WEBPACK_CONFIG_CACHE` environment variable to `false` to make it non persistent or just use {@link ConfigCache#persistent}
 * @class
 * @extends {Map}
 */
class ConfigCache extends Map {
    /**
     * @constructor
     * @param {ConfigEnvironment} environment
     */
    constructor(environment) {
        super();

        ENVIRONMENT.set(this, environment);
    }

    /**
     * @protected
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

        return get(value, ES_MODULE_KEY, false) ? value.default : value;
    }
}

export default ConfigCache;
