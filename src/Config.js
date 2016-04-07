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

class Config {
    /**
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
     * @param {...(String|Object<String,Function>|Object<String,Function[]>)} values
     * @returns {Config|ConfigList}
     */
    extend(...values) {
        let map = ConfigTransform.initWith(...values);

        for (let [key, value] of map.entries()) {
            let config = ConfigLoader.INSTANCE.loadConfig(key);

            if (config instanceof Config) {
                this.dependencyTree.children.push(config.dependencyTree);

                let prevConfig = config.clone();

                value.forEach(x => {
                    let currConfig = x.call(this, prevConfig);

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
     * @returns {Config}
     */
    clone() {
        return Config.initWith(this.toObject());
    }

    /**
     * @returns {Object}
     */
    toObject() {
        let properties = {};

        for (let [key, value] of Object.entries(this)) {
            if (this.hasOwnProperty(key)) {
                properties[key] = value;
            }
        }

        delete properties[DEPENDENCY_TREE];

        return properties;
    }

    /**
     * @param {...Object} values
     * @returns {Config}
     */
    static initWith(...values) {
        return new Config().merge(...values);
    }

    /**
     * @readonly
     * @type {String}
     */
    static get FILENAME() {
        return 'webpack.config.js';
    }
}

export default Config;
