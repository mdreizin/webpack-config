import {
    escapeRegExp
} from 'lodash';

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
 * @private
 * @type {WeakMap}
 */
const INSTANCE = new WeakMap();

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
        if (!INSTANCE.has(this)) {
            INSTANCE.set(this, new ConfigPatternCache());
        }

        return INSTANCE.get(this);
    }
}

export default ConfigPatternCache;
