import {
    escapeRegExp
} from 'lodash';
import ConfigServiceFactory from './ConfigServiceFactory';

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
 * @extends {Map}
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
        return ConfigServiceFactory.createInstanceOnce(this, () => new ConfigPatternCache());
    }
}

export default ConfigPatternCache;
