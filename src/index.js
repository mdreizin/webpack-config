import Config from './Config';
import ConfigBuilder from './ConfigBuilder';
import ConfigCache from './ConfigCache';
import ConfigLoader from './ConfigLoader';
import ConfigFinder from './ConfigFinder';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigRegistry from './ConfigRegistry';

/**
 * @module webpack-config
 */

/**
 * @type {Config}
 */
export default Config;

/**
 * @type {Object}
 */
export {
    /**
     * @type {Config}
     */
    Config,
    /**
     * @type {ConfigBuilder}
     */
    ConfigBuilder,
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
     * @type {ConfigRegistry}
     */
    ConfigRegistry
};
