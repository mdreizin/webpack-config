import {
    get
} from 'lodash';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigServiceLocator from './ConfigServiceLocator';

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
 * @extends {Map}
 */
class ConfigCache extends Map {
    /**
     * @param {ConfigEnvironment} environment
     */
    constructor(environment) {
        super();

        ENVIRONMENT.set(this, environment);
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

    /**
     * @readonly
     * @type {ConfigCache}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigCache(ConfigEnvironment.INSTANCE));
    }
}

export default ConfigCache;
