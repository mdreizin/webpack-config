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
import ConfigContainer from './ConfigContainer';
import ConfigOptionsResolver from './ConfigOptionsResolver';

/**
 * @private
 * @type {ConfigContainer}
 */
const container = new ConfigContainer();

/**
 * Proxy class which automatically fills {@link Config} constructor dependencies
 * @class
 * @extends {Config}
 */
const ConfigProxy = container.proxy(ConfigBase);

/**
 * Proxy class which automatically fills {@link ConfigBuilder} constructor dependencies
 * @class
 * @extends {ConfigBuilder}
 */
const ConfigBuilderProxy = container.proxy(ConfigBuilderBase);

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
    ConfigFactory,

    /**
     * @type {ConfigOptionsResolver}
     */
    ConfigOptionsResolver
};

/**
 * @type {ConfigEnvironment}
 */
export const environment = container.resolve(ConfigEnvironment);

/**
 * @type {ConfigCache}
 */
export const cache = container.resolve(ConfigCache);

/**
 * @type {ConfigPatternCache}
 */
export const patternCache = container.resolve(ConfigPatternCache);

/**
 * @type {ConfigNameResolver}
 */
export const nameResolver = container.resolve(ConfigNameResolver);

/**
 * @type {ConfigNameResolver}
 */
export const pathResolver = container.resolve(ConfigPathResolver);

/**
 * @type {ConfigLoader}
 */
export const loader = container.resolve(ConfigLoader);

/**
 * @type {ConfigFinder}
 */
export const finder = container.resolve(ConfigFinder);

/**
 * @type {ConfigFactory}
 */
export const factory = container.resolve(ConfigFactory);

/**
 * @type {ConfigOptionsResolver}
 */
export const optionsResolver = container.resolve(ConfigOptionsResolver);
