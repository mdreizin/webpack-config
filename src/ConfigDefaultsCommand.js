import {
    defaultsDeep
} from 'lodash';
import ConfigCommand from './ConfigCommand';

/**
 * @class
 * @extends {ConfigCommand}
 */
class ConfigDefaultsCommand extends ConfigCommand {
    /**
     * @override
     */
    execute(config, options) {
        const value = this.optionsResolver.resolve(config, options);

        defaultsDeep(config, value);
    }
}

export default ConfigDefaultsCommand;
