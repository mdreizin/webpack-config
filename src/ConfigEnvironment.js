import {
    isFunction,
    isUndefined
} from 'lodash';

/**
 * @private
 * @type {WeakMap}
 */
const INSTANCE = new WeakMap();

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
        if (!INSTANCE.has(this)) {
            INSTANCE.set(this, new ConfigEnvironment(Object.entries(process.env)));
        }

        return INSTANCE.get(this);
    }
}

export default ConfigEnvironment;
