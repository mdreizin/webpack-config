/**
 * @private
 * @type {WeakMap}
 */
const OPTIONS_RESOLVER = new WeakMap();

/**
 * @class
 */
class ConfigCommand {
    /**
     * @constructor
     * @param {ConfigOptionsResolver} optionsResolver
     */
    constructor(optionsResolver) {
        OPTIONS_RESOLVER.set(this, optionsResolver);
    }

    /**
     * @abstract
     * @param {Config} config
     * @param {ConfigOptions} options
     * @returns {void}
     */
    execute(config, options) {} // eslint-disable-line no-unused-vars

    /**
     * @type {ConfigOptionsResolver}
     */
    get optionsResolver() {
        return OPTIONS_RESOLVER.get(this);
    }
}

export default ConfigCommand;
