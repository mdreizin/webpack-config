import types from './ConfigCommandTypes';

/**
 * @private
 * @type {WeakMap}
 */
const CONTAINER = new WeakMap();

/**
 * @class
 */
class ConfigCommandFactory {
    /**
     * @constructor
     * @param {ConfigContainer} container
     */
    constructor(container) {
        CONTAINER.set(this, container);
    }

    /**
     * @readonly
     * @type {ConfigContainer}
     */
    get container() {
        return CONTAINER.get(this);
    }

    /**
     * Creates {@link ConfigCommand}
     * @param {String} name
     * @returns {ConfigCommand}
     */
    createCommand(name) {
        return this.container.resolve(types[name]);
    }
}

export default ConfigCommandFactory;
