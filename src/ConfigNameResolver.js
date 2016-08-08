/**
* @private
* @type {WeakMap}
*/
const ENVIRONMENT = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const PATTERN_CACHE = new WeakMap();

/**
 * @class
 */
class ConfigNameResolver {
    /**
     * @constructor
     * @param {ConfigEnvironment} environment
     * @param {ConfigPatternCache} patternCache
     */
    constructor(environment, patternCache) {
        ENVIRONMENT.set(this, environment);
        PATTERN_CACHE.set(this, patternCache);
    }

    /**
     * @protected
     * @readonly
     * @type {ConfigEnvironment}
     */
    get environment() {
        return ENVIRONMENT.get(this);
    }

    /**
     * @protected
     * @readonly
     * @type {ConfigPatternCache}
     */
    get patternCache() {
        return PATTERN_CACHE.get(this);
    }

    /**
     * @param {String} value
     * @returns {String}
     */
    resolve(value) {
        const options = {};

        for (const key of this.environment.keys()) {
            options[key] = this.environment.valueOf(key);
        }

        let resolvedValue;

        try {
            resolvedValue = this.patternCache.eval(value, options);
        } catch (e) {
            resolvedValue = value;
        }

        return resolvedValue;
    }
}

export default ConfigNameResolver;
