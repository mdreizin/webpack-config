import {
    isString
} from 'lodash';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigCache from './ConfigCache';
import ConfigFactory from './ConfigFactory';
import ConfigServiceLocator from './ConfigServiceLocator';

/**
 * @private
 * @type {WeakMap}
 */
const PATH_RESOLVER = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const CACHE = new WeakMap();

/**
 * @class
 */
class ConfigLoader {
    /**
     * @constructor
     * @param {ConfigPathResolver} pathResolver
     * @param {ConfigCache} cache
     */
    constructor(pathResolver, cache) {
        PATH_RESOLVER.set(this, pathResolver);
        CACHE.set(this, cache);
    }

    /**
     * @readonly
     * @type {ConfigPathResolver}
     */
    get pathResolver() {
        return PATH_RESOLVER.get(this);
    }

    /**
     * @readonly
     * @type {ConfigCache}
     */
    get cache() {
        return CACHE.get(this);
    }

    /**
     * @abstract
     * @param {String} filename
     * @returns {Config|ConfigList}
     */
    loadConfig(filename) {
        filename = this.pathResolver.resolvePath(filename);

        let config = this.cache.get(filename);

        if (config) {
            config = ConfigFactory.createConfig(config);
        }

        if (config && !isString(config.filename)) {
            config.filename = filename;
        }

        return config;
    }

    /**
     * @readonly
     * @type {ConfigLoader}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigLoader(ConfigPathResolver.INSTANCE, ConfigCache.INSTANCE));
    }
}

export default ConfigLoader;
