import {
    mergeWith
} from 'lodash';
import ConfigCommand from './ConfigCommand';

/**
 * @class
 * @extends {ConfigCommand}
 */
class ConfigMergeCommand extends ConfigCommand {
    /**
     * @override
     */
    execute(config, options) {
        const value = this.optionsResolver.resolve(config, options);

        mergeWith(config, value, (x, y) => { // eslint-disable-line consistent-return
            if (Array.isArray(x)) {
                return x.concat(y);
            }
        });
    }
}

export default ConfigMergeCommand;
