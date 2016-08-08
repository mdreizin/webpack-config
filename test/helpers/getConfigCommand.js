import Config from '../../src/Config';

/**
 * @private
 * @param {ConfigContainer} container
 * @param {ConfigCommand} Command
 * @returns {Array}
 */
export default (container, Command) => {
    const config = container.resolve(Config),
        command = container.resolve(Command);

    return [config, command];
};
