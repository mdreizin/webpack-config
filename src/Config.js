import {
    isFunction,
    isObject,
    defaultsDeep,
    mergeWith
} from 'lodash';
import ConfigLoader from './ConfigLoader';
import ConfigTransform from './ConfigTransform';
import ConfigDependency from './ConfigDependency';

/**
 * @private
 * @type {String}
 */
const DEPENDENCY_TREE = 'DEPENDENCY_TREE';

/**
 * @private
 * @param {Object|Function} value
 * @param {Config} context
 * @returns {*}
 */
let evalValue = (value, context) => isFunction(value) ? value.call(context, context) : value;

/**
 * @class
 */
class Config {
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
     * @param {...(Object|Function)} values
     * @returns {Config}
     */
    defaults(...values) {
        for (let value of Object.values(values)) {
            let properties = evalValue(value, this);

            defaultsDeep(this, properties);
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
     * @param {...(Object|Function)} values
     * @returns {Config}
     */
    merge(...values) {
        for (let value of Object.values(values)) {
            let properties = evalValue(value, this);

            mergeWith(this, properties, (x, y) => { // eslint-disable-line consistent-return
                if (Array.isArray(x)) {
                    return x.concat(y);
                }
            });
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
     * export default new Config().extend('npm-module-name/webpack.config.js');
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
     * @param {...(String|Object<String,Function>|Object<String,Function[]>)} values
     * @returns {Config}
     */
    extend(...values) {
        let map = ConfigTransform.initWith(...values);

        for (const [key, value] of map.entries()) {
            const config = ConfigLoader.INSTANCE.loadConfig(key);

            if (config instanceof Config) {
                this.dependencyTree.children.push(config.dependencyTree);

                let prevConfig = config.clone();

                value.forEach(x => {
                    const currConfig = x.call(this, prevConfig);

                    if (!isObject(currConfig)) {
                        prevConfig = {};
                    } else {
                        prevConfig = currConfig;
                    }

                    if (!(prevConfig instanceof Config)) {
                        prevConfig = Config.initWith(prevConfig);
                    }
                });

                if (prevConfig instanceof Config) {
                    this.merge(prevConfig.toObject());
                }
            }
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
        return Config.initWith(this.toObject());
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
            if (this.hasOwnProperty(key)) {
                properties[key] = value;
            }
        }

        delete properties[DEPENDENCY_TREE];

        return properties;
    }

    /**
     * Initializes new {@link Config} with specific `values`
     * @param {...Object} values
     * @returns {Config}
     */
    static initWith(...values) {
        return new Config().merge(...values);
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
