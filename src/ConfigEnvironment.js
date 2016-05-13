import {
    isFunction,
    isUndefined
} from 'lodash';
import ConfigServiceLocator from './ConfigServiceLocator';

/**
 * @extends {Map}
 */
class ConfigEnvironment extends Map {
    /**
     * @param {...Object<String,*>} values
     * @returns {ConfigEnvironment}
     */
    setAll(...values) {
        values.forEach(obj => {
            for (let [key, value] of Object.entries(obj)) {
                this.set(key, value);
            }
        });

        return this;
    }

    /**
     * @param {*} key
     * @returns {*}
     */
    valueOf(key) {
        let value = this.get(key);

        return isFunction(value) ? value.call(this, this) : value;
    }

    /**
     * @param {*} key
     * @param {*} [defaultValue]
     * @returns {*}
     */
    getOrDefault(key, defaultValue) {
        let value = this.valueOf(key);

        return isUndefined(value) ? defaultValue : value;
    }

    /**
     * @readonly
     * @type {ConfigEnvironment}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigEnvironment(Object.entries(process.env)));
    }
}

export default ConfigEnvironment;
