import {
    mergeWith,
    isObject
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
            if (Array.isArray(x) && Array.isArray(y)) {
                return [...x, ...y];
            } else if (Array.isArray(x) && isObject(y)) {
                return [...x, y];
            } else if (isObject(x) && Array.isArray(y)) {
                return [x, ...y];
            }
        });
    }
}

export default ConfigMergeCommand;
