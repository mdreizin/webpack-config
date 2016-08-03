import ConfigBase from './Config';
import ConfigBuilderBase from './ConfigBuilder';
import ConfigCache from './ConfigCache';
import ConfigLoader from './ConfigLoader';
import ConfigFinder from './ConfigFinder';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigFactory from './ConfigFactory';
import container from './container';

/**
 * Proxy class which automatically fills {@link Config} constructor dependencies
 * @class
 * @extends {Config}
 */
const ConfigProxy = container.proxyClass(ConfigBase);

/**
 * Proxy class which automatically fills {@link ConfigBuilder} constructor dependencies
 * @class
 * @extends {ConfigBuilder}
 */
const ConfigBuilderProxy = container.proxyClass(ConfigBuilderBase);

/**
 * @module webpack-config
 */

export default ConfigProxy;

export {
    /**
     * @type {ConfigProxy}
     */
    ConfigProxy as Config,

    /**
     * @type {ConfigBuilderProxy}
     */
    ConfigBuilderProxy as ConfigBuilder,

    /**
     * @type {ConfigPatternCache}
     */
    ConfigPatternCache,

    /**
     * @type {ConfigCache}
     */
    ConfigCache,

    /**
     * @type {ConfigLoader}
     */
    ConfigLoader,

    /**
     * @type {ConfigFinder}
     */
    ConfigFinder,

    /**
     * @type {ConfigEnvironment}
     */
    ConfigEnvironment,

    /**
     * @type {ConfigNameResolver}
     */
    ConfigNameResolver,

    /**
     * @type {ConfigPathResolver}
     */
    ConfigPathResolver,

    /**
     * @type {ConfigFactory}
     */
    ConfigFactory
};

/**
 * @type {ConfigEnvironment}
 */
export const environment = container.constitute(ConfigEnvironment);

/**
 * @type {ConfigCache}
 */
export const cache = container.constitute(ConfigCache);

/**
 * @type {ConfigPatternCache}
 */
export const patternCache = container.constitute(ConfigPatternCache);

/**
 * @type {ConfigNameResolver}
 */
export const nameResolver = container.constitute(ConfigNameResolver);

/**
 * @type {ConfigNameResolver}
 */
export const pathResolver = container.constitute(ConfigPathResolver);

/**
 * @type {ConfigLoader}
 */
export const loader = container.constitute(ConfigLoader);

/**
 * @type {ConfigFinder}
 */
export const finder = container.constitute(ConfigFinder);

/**
 * @type {ConfigFactory}
 */
export const factory = container.constitute(ConfigFactory);
