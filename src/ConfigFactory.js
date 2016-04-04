import {
    isFunction,
    isObject
} from 'lodash';
import Config from './Config';
import ConfigList from './ConfigList';

/**
 * @class
 */
class ConfigFactory {
    /**
     * @param {Function|Object|Object[]} value
     * @returns {Config|ConfigList}
     */
    static createConfig(value) {
        let config;

        if (isFunction(value)) {
            config = value();
        }

        if (Array.isArray(value)) {
            config = ConfigList.initWith(value);
        } else if (isObject(value)) {
            config = Config.initWith(value);
        }

        return config;
    }
}

export default ConfigFactory;
