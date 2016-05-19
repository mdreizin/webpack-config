import {
    escapeRegExp
} from 'lodash';
import ConfigServiceLocator from './ConfigServiceLocator';

/**
 * @private
 * @type {String}
 */
const BEGIN_TAG = '[';

/**
 * @private
 * @type {String}
 */
const END_TAG = ']';

/**
 * @class
 * @extends {Map}
 * @private
 */
class ConfigPatternCache extends Map {
    /**
     * @param {*} key
     * @returns {RegExp}
     */
    getOrSet(key) {
        if (!this.has(key)) {
            this.set(key, key);
        }

        return this.get(key);
    }

    /**
     * @override
     */
    set(key, value) {
        return super.set(key, ConfigPatternCache.compile(value));
    }

    /**
     * @param {*} value
     * @returns {RegExp}
     */
    static compile(value) {
        return new RegExp(escapeRegExp(`${BEGIN_TAG}${value}${END_TAG}`));
    }

    /**
     * @readonly
     * @type {ConfigPatternCache}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigPatternCache());
    }
}

export default ConfigPatternCache;
