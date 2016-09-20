import {
    isFunction
} from 'lodash';

/**
 * @private
 * @type {WeakMap}
 */
const CONFIG = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const PENDING_CONFIG = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const FACTORY = new WeakMap();

/**
 * @private
 * @param {String} path
 * @param {*|Function} hook
 * @param {Config} current
 * @param {Config} previous
 * @returns {*}
 */
const evalHook = (path, hook, current, previous) => isFunction(hook) ? hook(path, current, previous) : hook;

/**
 * @class
 */
class ConfigBuilder {
    /**
     * @constructor
     * @param {ConfigFactory} factory
     */
    constructor(factory) {
        FACTORY.set(this, factory);
    }

    /**
     * @readonly
     * @type {ConfigFactory}
     */
    get factory() {
        return FACTORY.get(this);
    }

    /**
     * @private
     * @readonly
     * @type {Config|ConfigList}
     */
    get config() {
        return this.getOrSetConfig(CONFIG);
    }

    /**
     * @readonly
     * @type {Config}
     */
    get pendingConfig() {
        return this.getOrSetConfig(PENDING_CONFIG);
    }

    /**
     * @private
     * @param {WeakMap} map
     * @returns {Config}
     */
    getOrSetConfig(map) {
        if (!map.has(this)) {
            map.set(this, this.factory.createConfig({}));
        }

        return map.get(this);
    }

    /**
     * @param {Function|Object|Object[]} value
     * @returns {ConfigBuilder}
     */
    copyOf(value) {
        CONFIG.set(this, this.factory.createConfig(value));

        return this;
    }

    /**
     * @see {@link Config#merge}
     * @param {...ConfigOptions} values
     * @returns {ConfigBuilder}
     */
    merge(...values) {
        this.pendingConfig.merge(...values);

        return this;
    }

    /**
     * @see {@link Config#defaults}
     * @param {...ConfigOptions} values
     * @returns {ConfigBuilder}
     */
    defaults(...values) {
        this.pendingConfig.defaults(...values);

        return this;
    }

    /**
     * @see {@link Config#extend}
     * @param {...ConfigExtendOptions} values
     * @returns {ConfigBuilder}
     */
    extend(...values) {
        this.pendingConfig.extend(...values);

        return this;
    }

    /**
     * @param {Object<String,Function>} [hooks]
     * @returns {ConfigBuilder}
     */
    applyHooks(hooks = {}) {
        for (const [path, hook] of Object.entries(hooks)) {
            if (Array.isArray(this.config)) {
                this.config.forEach(config => {
                    if (config.has(path)) {
                        const value = evalHook(path, hook, this.pendingConfig, config);

                        this.pendingConfig.set(path, value);
                    }
                });
            } else {
                if (this.pendingConfig.has(path)) {
                    const value = evalHook(path, hook, this.pendingConfig, this.config);

                    this.pendingConfig.set(path, value);
                }
            }
        }

        return this;
    }

    /**
     * @returns {Config|ConfigList}
     */
    build() {
        let value;

        if (Array.isArray(this.config)) {
            value = this.config.map(x => x.clone().merge(this.pendingConfig).toObject());
        } else {
            value = this.config.clone().merge(this.pendingConfig).toObject();
        }

        const config = this.factory.createConfig(value);

        PENDING_CONFIG.delete(this);
        CONFIG.set(this, config);

        return config;
    }
}

export default ConfigBuilder;
