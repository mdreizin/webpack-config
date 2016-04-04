import {
    isFunction,
    isString,
    isObject
} from 'lodash';

/**
 * @private
 * @type {String[]}
 */
const EXCLUDE_FIELDS = [
    'filename',
    'DEPENDENCY_TREE'
];

/**
 * @private
 * @param {Config} config
 * @returns {Config}
 */
let DEFAULT_TRANSFORM = config => config;

/**
 * @private
 * @param {Config} config
 * @returns {config}
 */
let CLEANUP_TRANSFORM = config => {
    EXCLUDE_FIELDS.forEach(function(name) {
        delete config[name];
    });

    return config;
};

/**
 * @extends {Map}
 */
class ConfigTransform extends Map {
    /**
     * @override
     * @param {*} key
     * @param {Function} [value]
     * @throws {ReferenceError}
     * @returns {Function[]}
     */
    set(key, value = ConfigTransform.DEFAULT) {
        if (!isFunction(value)) {
            throw new ReferenceError(`\`${value}\` is not \`Function\``);
        }

        let values = this.has(key) ? this.get(key) : [];

        if (this.has(key)) {
            values.pop();
        }

        values.push(value, ConfigTransform.CLEANUP);

        return super.set(key, values);
    }

    /**
     * @param {...(String|Object<String,Function>|Object<String,Function[]>)} values
     * @returns {ConfigTransform}
     */
    setAll(...values) {
        values.forEach(obj => {
            if (isString(obj)) {
                this.set(obj);
            } else if (isObject(obj)) {
                for (let [key, value] of Object.entries(obj)) {
                    if (Array.isArray(value)) {
                        value.filter(isFunction).forEach(x => this.set(key, x));
                    } else if (isFunction(value)) {
                        this.set(key, value);
                    }
                }
            }
        });

        return this;
    }

    /**
     * @type {Function}
     */
    static get DEFAULT() {
        return DEFAULT_TRANSFORM;
    }

    /**
     * @type {Function}
     */
    static get CLEANUP() {
        return CLEANUP_TRANSFORM;
    }

    /**
     * @param {...(String|Object<String,Function>|Object<String,Function[]>)} values
     * @returns {ConfigTransform}
     */
    static initWith(...values) {
        return new ConfigTransform().setAll(...values);
    }
}

export default ConfigTransform;
