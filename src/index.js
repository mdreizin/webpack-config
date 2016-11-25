import ConfigBase from './Config';
import ConfigCache from './ConfigCache';
import ConfigLoader from './ConfigLoader';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigStringResolver from './ConfigStringResolver';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigFactory from './ConfigFactory';
import ConfigContainer from './ConfigContainer';
import ConfigOptionsResolver from './ConfigOptionsResolver';
import ConfigCommandFactory from './ConfigCommandFactory';

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
 * @module webpack-config
 */

export default ConfigProxy;

export {
    /**
     * @type {ConfigProxy}
     */
    ConfigProxy as Config,

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
     * @type {ConfigEnvironment}
     */
    ConfigEnvironment,

    /**
     * @type {ConfigStringResolver}
     */
    ConfigStringResolver,

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
    ConfigOptionsResolver,

    /**
     * @type {ConfigCommandFactory}
     */
    ConfigCommandFactory
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
 * @type {ConfigStringResolver}
 */
export const stringResolver = container.resolve(ConfigStringResolver);

/**
 * @type {ConfigPathResolver}
 */
export const pathResolver = container.resolve(ConfigPathResolver);

/**
 * @type {ConfigLoader}
 */
export const loader = container.resolve(ConfigLoader);

/**
 * @type {ConfigFactory}
 */
export const factory = container.resolve(ConfigFactory);

/**
 * @type {ConfigOptionsResolver}
 */
export const optionsResolver = container.resolve(ConfigOptionsResolver);

/**
 * @type {ConfigCommandFactory}
 */
export const commandFactory = container.resolve(ConfigCommandFactory);
