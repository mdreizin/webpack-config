/**
 * @private
 * @type {WeakMap}
 */
const COMMAND = new WeakMap();

/**
 * @class
 */
class ConfigCommandInvoker {
    /**
     * @constructor
     * @param {ConfigCommand} command
     */
    constructor(command) {
        COMMAND.set(this, command);
    }

    /**
     * @readonly
     * @type {ConfigCommand}
     */
    get command() {
        return COMMAND.get(this);
    }

    /**
     * @param {Config} config
     * @param {...*} values
     * @returns {Config}
     */
    invoke(config, ...values) {
        for (const value of values) {
            this.command.execute(config, value);
        }

        return config;
    }

    /**
     * @param {String} name
     * @param {Config} config
     * @param {...*} values
     * @return {Config}
     */
    static invoke(name, config, ...values) {
        const command = config.commandFactory.createCommand(name);

        return new ConfigCommandInvoker(command).invoke(config, ...values);
    }
}

export default ConfigCommandInvoker;
