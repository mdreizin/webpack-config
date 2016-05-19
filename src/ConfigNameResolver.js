import {
    isUndefined
} from 'lodash';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigServiceLocator from './ConfigServiceLocator';

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
        for (const key of this.environment.keys()) {
            const pattern = this.patternCache.getOrSet(key),
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
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigNameResolver(ConfigEnvironment.INSTANCE, ConfigPatternCache.INSTANCE));
    }
}

export default ConfigNameResolver;
