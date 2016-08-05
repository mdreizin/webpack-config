import {
    isFunction,
    isObject
} from 'lodash';
import Config from './Config';
import ConfigList from './ConfigList';

/**
 * @private
 * @type {WeakMap}
 */
const CONTAINER = new WeakMap();

/**
 * @class
 */
class ConfigFactory {
    /**
     * @constructor
     * @param {ConfigContainer} container
     */
    constructor(container) {
        CONTAINER.set(this, container);
    }

    /**
     * @readonly
     * @type {ConfigContainer}
     */
    get container() {
        return CONTAINER.get(this);
    }

    /**
     * @private
     * @param {Object} options
     * @returns {Config}
     */
    initWith(options) {
        const config = this.container.resolve(Config);

        return config.merge(options);
    }

    /**
     * @param {Function|Object|Object[]} value
     * @returns {Config|ConfigList}
     */
    createConfig(value) {
        let config;

        if (isFunction(value)) {
            config = value();
        }

        if (Array.isArray(value)) {
            config = ConfigList.from(value, x => this.initWith(x));
        } else if (isObject(value)) {
            config = this.initWith(value);
        }

        return config;
    }
}

export default ConfigFactory;
