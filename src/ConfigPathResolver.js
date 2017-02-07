import {
    isString
} from 'lodash';
import ConfigStrategyList from './ConfigStrategyList';
import DEFAULT_RESOLVERS from './ConfigPathResolvers';

/**
 * @private
 * @type {WeakMap}
 */
const PATH_RESOLVERS = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const STRING_RESOLVER = new WeakMap();

/**
 * @class
 */
class ConfigPathResolver {
    /**
     * @constructor
     * @param {ConfigStringResolver} stringResolver
     * @param {Function[]} [pathResolvers]
     */
    constructor(stringResolver, pathResolvers = DEFAULT_RESOLVERS) {
        STRING_RESOLVER.set(this, stringResolver);
        PATH_RESOLVERS.set(this, ConfigStrategyList.from(pathResolvers));
    }

    /**
     * @readonly
     * @type {ConfigStringResolver}
     */
    get stringResolver() {
        return STRING_RESOLVER.get(this);
    }

    /**
     * @readonly
     * @type {ConfigStrategyList}
     */
    get pathResolvers() {
        return PATH_RESOLVERS.get(this);
    }

    /**
     * @param {String} value
     * @returns {String}
     */
    resolve(value) {
        value = this.stringResolver.resolve(value);

        return this.pathResolvers.resolve(value, x => isString(x));
    }
}

export default ConfigPathResolver;
