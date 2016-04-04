import {
    isUndefined
} from 'lodash';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';

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
 * @private
 * @type {WeakMap}
 */
const INSTANCE = new WeakMap();

class ConfigNameResolver {
    /**
     * @param {ConfigEnvironment} environment
     * @param {ConfigPatternCache} patternCache
     */
    constructor(environment, patternCache) {
        ENVIRONMENT.set(this, environment);
        PATTERN_CACHE.set(this, patternCache);
    }

    /**
     * @readonly
     * @type {ConfigEnvironment}
     */
    get environment() {
        return ENVIRONMENT.get(this);
    }

    /**
     * @readonly
     * @type {ConfigPatternCache}
     */
    get patternCache() {
        return PATTERN_CACHE.get(this);
    }

    /**
     * @param {String} filename
     * @returns {String}
     */
    resolveName(filename) {
        for (let key of this.environment.keys()) {
            let pattern = this.patternCache.getOrSet(key),
                value = this.environment.valueOf(key);

            if (!isUndefined(value)) {
                filename = filename.replace(pattern, value);
            }
        }

        return filename;
    }

    /**
     * @readonly
     * @type {ConfigNameResolver}
     */
    static get INSTANCE() {
        if (!INSTANCE.has(this)) {
            INSTANCE.set(this, new ConfigNameResolver(ConfigEnvironment.INSTANCE, ConfigPatternCache.INSTANCE));
        }

        return INSTANCE.get(this);
    }
}

export default ConfigNameResolver;
