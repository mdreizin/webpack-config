import {
    resolve
} from 'path';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigServiceLocator from './ConfigServiceLocator';

/**
 * @private
 * @type {WeakMap}
 */
const NAME_RESOLVER = new WeakMap();

/* eslint-disable valid-jsdoc */
/**
 * @private
 * @type {Function[]}
 */
const DEFAULT_RESOLVERS = [
    /**
     * `require('<npm-module-name>')`
     * @param {String} filename
     * @returns {String}
     */
    filename => require.resolve(filename),

    /**
     * `path.resolve('<file-name>')`
     * @param {String} filename
     * @returns {String}
     */
    filename => resolve(filename)
];
/* eslint-enable valid-jsdoc */

/**
 * @private
 * @type {WeakMap}
 */
const RESOLVERS = new WeakMap();

/**
 * @class
 */
class ConfigPathResolver {
    /**
     * @constructor
     * @param {ConfigNameResolver} nameResolver
     * @param {Function[]} [resolvers]
     */
    constructor(nameResolver, resolvers = DEFAULT_RESOLVERS) {
        NAME_RESOLVER.set(this, nameResolver);
        RESOLVERS.set(this, resolvers);
    }

    /**
     * @readonly
     * @type {ConfigNameResolver}
     */
    get nameResolver() {
        return NAME_RESOLVER.get(this);
    }

    /**
     * @readonly
     * @type {Function[]}
     */
    get resolvers() {
        return RESOLVERS.get(this);
    }

    /**
     * @param {String} filename
     * @returns {String}
     */
    resolvePath(filename) {
        filename = this.nameResolver.resolveName(filename);

        this.resolvers.forEach(resolver => {
            try {
                filename = resolver(filename);
            } catch (e) {} // eslint-disable-line no-empty
        });

        return filename;
    }

    /**
     * @readonly
     * @type {ConfigPathResolver}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigPathResolver(ConfigNameResolver.INSTANCE));
    }
}

export default ConfigPathResolver;
