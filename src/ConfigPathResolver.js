import {
    resolve
} from 'path';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigRegistry from './ConfigRegistry';

/**
 * @private
 * @type {WeakMap}
 */
const NAME_RESOLVER = new WeakMap();

/**
 * @class
 */
class ConfigPathResolver {
    /**
     * @constructor
     * @param {ConfigNameResolver} nameResolver
     */
    constructor(nameResolver) {
        NAME_RESOLVER.set(this, nameResolver);
    }

    /**
     * @readonly
     * @type {ConfigNameResolver}
     */
    get nameResolver() {
        return NAME_RESOLVER.get(this);
    }

    /**
     * @param {String} filename
     * @returns {String}
     */
    resolvePath(filename) {
        filename = this.nameResolver.resolveName(filename);

        try {
            filename = require.resolve(filename);
        } catch (e) {
            filename = resolve(filename);
        }

        return filename;
    }

    /**
     * @readonly
     * @type {ConfigPathResolver}
     */
    static get INSTANCE() {
        return ConfigRegistry.INSTANCE.getOrSet(this, () => new ConfigPathResolver(ConfigNameResolver.INSTANCE));
    }
}

export default ConfigPathResolver;
