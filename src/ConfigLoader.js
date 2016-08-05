import {
    isString
} from 'lodash';

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
 * @private
 * @type {WeakMap}
 */
const FACTORY = new WeakMap();

/**
 * @class
 */
class ConfigLoader {
    /**
     * @constructor
     * @param {ConfigPathResolver} pathResolver
     * @param {ConfigCache} cache
     * @param {ConfigFactory} factory
     */
    constructor(pathResolver, cache, factory) {
        PATH_RESOLVER.set(this, pathResolver);
        CACHE.set(this, cache);
        FACTORY.set(this, factory);
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
     * @readonly
     * @type {ConfigFactory}
     */
    get factory() {
        return FACTORY.get(this);
    }

    /**
     * @param {String} filename
     * @returns {Config|ConfigList}
     */
    loadConfig(filename) {
        filename = this.pathResolver.resolve(filename);

        let config = this.cache.get(filename);

        if (config) {
            config = this.factory.createConfig(config);
        }

        if (config && !isString(config.filename)) {
            config.filename = filename;
        }

        return config;
    }
}

export default ConfigLoader;
