import ConfigDefaultsCommand from './ConfigDefaultsCommand';
import ConfigMergeCommand from './ConfigMergeCommand';
import ConfigExtendCommand from './ConfigExtendCommand';
import * as names from './ConfigCommandNames';

export default {
    [names.DEFAULTS]: ConfigDefaultsCommand,
    [names.MERGE]: ConfigMergeCommand,
    [names.EXTEND]: ConfigExtendCommand,
};
