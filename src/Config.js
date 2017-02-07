import {
    set,
    unset,
    get,
    has
} from 'lodash';
import ConfigDependency from './ConfigDependency';
import ConfigCommandInvoker from './ConfigCommandInvoker';
import * as commandNames from './ConfigCommandNames';

/**
 * @private
 * @type {WeakMap}
 */
const DEPENDENCY_TREE = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const COMMAND_FACTORY = new WeakMap();

/**
 * @class
 */
class Config {
    /**
     * @constructor
     * @param {ConfigCommandFactory} commandFactory
     */
    constructor(commandFactory) {
        COMMAND_FACTORY.set(this, commandFactory);
    }

    /**
     * @readonly
     * @type {ConfigCommandFactory}
     */
    get commandFactory() {
        return COMMAND_FACTORY.get(this);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.extend('./test/fixtures/webpack.1.config.js');
     *
     * for (const {node} of config.dependencyTree) {
     *   console.log(node.root.filename);
     * }
     * // ./test/fixtures/webpack.1.config.js
     * // ./test/fixtures/webpack.2.config.js
     * // ./test/fixtures/webpack.3.config.js
     * // ./test/fixtures/webpack.5.config.js
     * // ./test/fixtures/webpack.4.config.js
     * @description Holds information about [included]{@link Config#extend} configs
     * @readonly
     * @type {ConfigDependency}
     */
    get dependencyTree() {
        if (!DEPENDENCY_TREE.has(this)) {
            DEPENDENCY_TREE.set(this, new ConfigDependency(this));
        }

        return DEPENDENCY_TREE.get(this);
    }

    /**
     * @private
     * @param {ConfigDependency} value
     */
    set dependencyTree(value) {
        DEPENDENCY_TREE.set(this, value);
    }

    /**
     * import Config from 'webpack-config';
     *
     * export default new Config().defaults({
     *    debug: true
     * }, {
     *    profile: false
     * });
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().defaults(() => {
     *     return {
     *         debug: true
     *     };
     * });
     * @description Adds `values` if they are missing
     * @param {...ConfigOptions} values
     * @returns {Config}
     */
    defaults(...values) {
        return ConfigCommandInvoker.invoke(commandNames.DEFAULTS, this, ...values);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().merge({
     *    debug: true
     * }, {
     *    profile: false
     * });
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().merge(() => {
     *     return {
     *         debug: true
     *     };
     * });
     * @description Merges `values`
     * @param {...ConfigOptions} values
     * @returns {Config}
     */
    merge(...values) {
        return ConfigCommandInvoker.invoke(commandNames.MERGE, this, ...values);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().extend('./test/fixtures/webpack.1.config.js');
     * @example
     * import Config from 'webpack-config';
     *
     * // Loads from `node_modules/react-redux/webpack.config.js`
     * export default new Config().extend('react-redux/webpack.config.js');
     * @example
     * import Config from 'webpack-config';
     *
     * // Loads from `node_modules/webpack-config-my/webpack.config.js`
     * export default new Config().extend('my/webpack.config.js');
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().extend({
     *    './test/fixtures/webpack.1.config.js': config => {
     *        delete config.tags;
     *
     *        return config;
     *    }
     * });
     * @example
     * import Config from 'webpack-config';
     *
     * export default new Config().extend({
     *    './test/fixtures/webpack.1.config.js': [config => {
     *        delete config.tags;
     *
     *        return config;
     *    }, config => {
     *        delete config.profile;
     *
     *        return config;
     *    }]
     * });
     * @description Helps to extend config using local file or shareable config file which should be hosted under `node_modules`
     * @param {...ConfigExtendPossibleOptions} values
     * @returns {Config}
     */
    extend(...values) {
        return ConfigCommandInvoker.invoke(commandNames.EXTEND, this, ...values);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.merge({
     *   debug: true
     * });
     *
     * console.log(config.clone());
     * // Config { debug: true }
     * @description Creates copy of {@link Config}
     * @returns {Config}
     */
    clone() {
        const config = new Config(this.commandFactory);

        config.dependencyTree = new ConfigDependency(config, this.dependencyTree.children);

        return config.merge(this.toObject());
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.merge({
     *   debug: true
     * });
     *
     * console.log(config.toObject());
     * // Object { debug: true }
     * @description Returns plain `Object` representation of {@link Config}
     * @returns {Object}
     */
    toObject() {
        const properties = {};

        for (const [key, value] of Object.entries(this)) {
            if (this.has(key)) {
                properties[key] = value;
            }
        }

        return properties;
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.set('debug', true);
     *
     * console.log(config.toObject());
     * // Object { debug: true }
     * @description Sets `value` at `path`
     * @param {String} path
     * @param {*} value
     * @return {Config}
     */
    set(path, value) {
        set(this, path, value);

        return this;
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.set('debug', true);
     *
     * console.log(config.get('debug'));
     * // true
     * @description Gets `value` at `path`
     * @param {String} path
     * @return {*}
     */
    get(path) {
        return get(this, path);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.set('debug', true).remove('debug');
     *
     * console.log(config.get('debug'));
     * // undefined
     * @description Removes `value` at `path`
     * @param {String} path
     * @return {Config}
     */
    remove(path) {
        unset(this, path);

        return this;
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * const config = new Config();
     *
     * config.set('debug', true);
     *
     * console.log(config.has('debug'));
     * // true
     * @description Checks if `value` exist at `path`
     * @param {String} path
     * @return {Boolean}
     */
    has(path) {
        return has(this, path);
    }

    /**
     * @returns {Object}
     */
    toJSON() {
        return this.toObject();
    }
}

export default Config;
