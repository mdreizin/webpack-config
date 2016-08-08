import {
    set,
    unset,
    get,
    has
} from 'lodash';
import ConfigDependency from './ConfigDependency';

/**
 * @private
 * @type {String}
 */
const DEPENDENCY_TREE = 'DEPENDENCY_TREE';

/**
 * @private
 * @type {WeakMap}
 */
const LOADER = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const FACTORY = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const DEFAULTS_COMMAND = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const MERGE_COMMAND = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const EXTEND_COMMAND = new WeakMap();

/**
 * @class
 */
class Config {
    /**
     * @constructor
     * @param {ConfigFactory} factory
     * @param {ConfigDefaultsCommand} defaultsCommand
     * @param {ConfigMergeCommand} mergeCommand
     * @param {ConfigExtendCommand} extendCommand
     */
    constructor(factory, defaultsCommand, mergeCommand, extendCommand) {
        FACTORY.set(this, factory);
        DEFAULTS_COMMAND.set(this, defaultsCommand);
        MERGE_COMMAND.set(this, mergeCommand);
        EXTEND_COMMAND.set(this, extendCommand);
    }

    /**
     * @readonly
     * @type {ConfigLoader}
     */
    get loader() {
        return LOADER.get(this);
    }

    /**
     * @readonly
     * @type {ConfigFactory}
     */
    get factory() {
        return FACTORY.get(this);
    }

    /**
     * @readonly
     * @type {ConfigDefaultsCommand}
     */
    get defaultsCommand() {
        return DEFAULTS_COMMAND.get(this);
    }

    /**
     * @readonly
     * @type {ConfigMergeCommand}
     */
    get mergeCommand() {
        return MERGE_COMMAND.get(this);
    }

    /**
     * @readonly
     * @type {ConfigExtendCommand}
     */
    get extendCommand() {
        return EXTEND_COMMAND.get(this);
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * let config = new Config();
     *
     * config.extend('./test/fixtures/webpack.1.config.js');
     *
     * for (let {node} of config.dependencyTree) {
     *   console.log(node.root.filename);
     * }
     * // ./test/fixtures/webpack.1.config.js
     * // ./test/fixtures/webpack.2.config.js
     * // ./test/fixtures/webpack.3.config.js
     * // ./test/fixtures/webpack.5.config.js
     * // ./test/fixtures/webpack.4.config.js
     * @description Keeps information about configs which have been loaded via {@link Config#extend}
     * @readonly
     * @type {ConfigDependency}
     */
    get dependencyTree() {
        if (!this[DEPENDENCY_TREE]) {
            this[DEPENDENCY_TREE] = new ConfigDependency(this);
        }

        return this[DEPENDENCY_TREE];
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
        for (const value of Object.values(values)) {
            this.defaultsCommand.execute(this, value);
        }

        return this;
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
        for (const value of Object.values(values)) {
            this.mergeCommand.execute(this, value);
        }

        return this;
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
        for (const value of Object.values(values)) {
            this.extendCommand.execute(this, value);
        }

        return this;
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * let config = new Config();
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
        return new Config(this.factory, this.defaultsCommand, this.mergeCommand, this.extendCommand).merge(this.toObject());
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * let config = new Config();
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

        delete properties[DEPENDENCY_TREE];

        return properties;
    }

    /**
     * @example
     * import Config from 'webpack-config';
     *
     * let config = new Config();
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
     * let config = new Config();
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
     * let config = new Config();
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
     * let config = new Config();
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

    /**
     * Returns `webpack.config.js`
     * @readonly
     * @type {String}
     */
    static get FILENAME() {
        return 'webpack.config.js';
    }
}

export default Config;
