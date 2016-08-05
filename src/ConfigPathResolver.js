import {
    isString,
    isError
} from 'lodash';
import {
    resolve
} from 'path';

/**
 * @private
 * @type {WeakMap}
 */
const NAME_RESOLVER = new WeakMap();

/**
 * @private
 * @type {String}
 */
const MODULE_PREFIX = 'webpack-config';

/* eslint-disable valid-jsdoc */
/**
 * @private
 * @type {Function[]}
 */
const DEFAULT_RESOLVERS = [
    /**
     * `require('<module-name>')`
     * @param {String} value
     * @returns {String|Error}
     */
    value => {
        try {
            return require.resolve(value);
        } catch (err) {
            return err;
        }
    },

    /**
     * `require('webpack-config-<name>')`
     * @param {String} value
     * @returns {String|Error}
     */
    value => {
        try {
            return require.resolve(`${MODULE_PREFIX}-${value}`);
        } catch (err) {
            return err;
        }
    },

    /**
     * `path.resolve('<file-name>')`
     * @param {String} value
     * @returns {String}
     */
    value => resolve(value)
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
     * @param {String} value
     * @returns {String}
     */
    resolve(value) {
        value = this.nameResolver.resolve(value);

        for (const resolver of this.resolvers) {
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
