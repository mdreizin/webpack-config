import {
    template
} from 'lodash';

/**
 * @private
 * @type {RegExp}
 */
const DEFAULT_INTERPOLATE = /\[([\w\s]+?)]/g;

/**
 * @private
 * @type {WeakMap}
 */
const INTERPOLATE = new WeakMap();

/**
 * @class
 * @extends {Map}
 */
class ConfigPatternCache extends Map {
    /**
     * @constructor
     * @param {RegExp} [interpolate=/\[([\w\s]+?)]/g]
     */
    constructor(interpolate = DEFAULT_INTERPOLATE) {
        super();

        this.interpolate = interpolate;
    }

    /**
     * @type {RegExp}
     */
    get interpolate() {
        return INTERPOLATE.get(this);
    }

    /**
     * @example
     * import {
     *   patternCache
     * } from 'webpack-config';
     *
     * patternCache.interpolate = /{([\w\s]+?)}/g;
     * @param {RegExp} value
     */
    set interpolate(value) {
        INTERPOLATE.set(this, value);
    }

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
     * @param {*} key
     * @param {String} value
     * @returns {RegExp}
     */
    set(key, value) {
        return super.set(key, this.compile(value));
    }

    /**
     * @param {String} value
     * @param {Object} options
     * @returns {String}
     */
    eval(value, options = {}) {
        const compiledTemplate = this.getOrSet(value);

        return compiledTemplate(options);
    }

    /**
     * @param {String} value
     * @returns {Function}
     */
    compile(value) {
        return template(value, {
            interpolate: this.interpolate
        });
    }
}

export default ConfigPatternCache;
