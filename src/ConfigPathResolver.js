import {
    isString,
    isError
} from 'lodash';
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
        PATH_RESOLVERS.set(this, pathResolvers);
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
     * @type {Function[]}
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

        for (const resolver of this.pathResolvers) {
            const resolvedValue = resolver(value),
                throwsError = isError(value) || value instanceof Error;

            if (isString(resolvedValue) && !throwsError) {
                value = resolvedValue;
                break;
            }
        }

        return value;
    }
}

export default ConfigPathResolver;
