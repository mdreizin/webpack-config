import {
    isFunction,
    isObject
} from 'lodash';
import Config from './Config';
import ConfigList from './ConfigList';
import { env } from './ConfigArgv';

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
     * @param {Object|Config} value
     * @returns {Config}
     */
    initWith(value) {
        let config;

        if (value instanceof Config) {
            config = value.clone();
        } else {
            config = this.container.resolve(Config).merge(value);
        }

        return config;
    }

    /**
     * @param {Function|Object|Object[]} value
     * @returns {Config|ConfigList}
     */
    createConfig(value) {
        let config;

        if (isFunction(value)) {
            value = value(env);
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
