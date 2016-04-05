import ConfigEnvironment from './ConfigEnvironment';
import ConfigServiceFactory from './ConfigServiceFactory';

/**
 * @private
 * @type {String}
 */
const PERSISTENT = 'WEBPACK_CONFIG_CACHE';

/**
 * @private
 * @type {WeakMap}
 */
const ENVIRONMENT = new WeakMap();

/**
 * @private
 * @param {*} value
 * @returns {*}
 */
let evalValue = value => value.__esModule === true ? value.default : value; // eslint-disable-line

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
        return this.environment.getOrDefault(PERSISTENT, true) === true;
    }

    /**
     * @param {Boolean} value
     */
    set persistent(value) {
        this.environment.set(PERSISTENT, value);
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

        return evalValue(value);
    }

    /**
     * @readonly
     * @type {ConfigCache}
     */
    static get INSTANCE() {
        return ConfigServiceFactory.createInstanceOnce(this, () => new ConfigCache(ConfigEnvironment.INSTANCE));
    }
}

export default ConfigCache;
