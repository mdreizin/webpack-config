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
const LOADER = new WeakMap();

/**
 * @class
 */
class ConfigFactory {
    /**
     * @constructor
     * @param {ConfigLoader} loader
     */
    constructor(loader) {
        LOADER.set(this, loader);
    }

    /**
     * @protected
     * @readonly
     * @type {ConfigLoader}
     */
    get loader() {
        return LOADER.get(this);
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
            config = ConfigList.from(value, x => new Config(this.loader).merge(x));
        } else if (isObject(value)) {
            config = new Config(this.loader).merge(value);
        }

        return config;
    }
}

export default ConfigFactory;
