import {
    resolve
} from 'path';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigServiceFactory from './ConfigServiceFactory';

/**
 * @private
 * @type {WeakMap}
 */
const NAME_RESOLVER = new WeakMap();

class ConfigPathResolver {
    /**
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
        return ConfigServiceFactory.createInstanceOnce(this, () => new ConfigPathResolver(ConfigNameResolver.INSTANCE));
    }
}

export default ConfigPathResolver;
