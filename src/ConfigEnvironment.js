import {
    isFunction,
    isUndefined
} from 'lodash';

/**
 * @class
 * @extends {Map}
 */
class ConfigEnvironment extends Map {
    /**
     * @param {...Object<String,*>} values
     * @returns {ConfigEnvironment}
     */
    setAll(...values) {
        values.forEach(obj => {
            for (const [key, value] of Object.entries(obj)) {
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
        const value = this.get(key);

        return isFunction(value) ? value.call(this, this) : value;
    }

    /**
     * @param {*} key
     * @param {*} [defaultValue]
     * @returns {*}
     */
    getOrDefault(key, defaultValue) {
        const value = this.valueOf(key);

        return isUndefined(value) ? defaultValue : value;
    }
}

export default ConfigEnvironment;
