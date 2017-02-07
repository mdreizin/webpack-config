import Config from './Config';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigCache from './ConfigCache';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigContainer from './ConfigContainer';

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
const ConfigProxy = container.proxy(Config);

/**
 * @module webpack-config
 */

export default ConfigProxy;

export {
    /**
     * @type {ConfigProxy}
     */
    ConfigProxy as Config
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
 * Returns `webpack.config.js`
 * @type {String}
 */
export const FILENAME = 'webpack.config.js';
