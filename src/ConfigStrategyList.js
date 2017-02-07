import {
    isError
} from 'lodash';

/**
 * @class
 * @extends {Array}
 */
class ConfigStrategyList extends Array {
    /**
     * @param {*} value
     * @param {Function} predicate
     * @returns {*}
     */
    resolve(value, predicate) {
        for (const resolver of this) {
            try {
                const resolvedValue = resolver(value),
                    throwsError = isError(resolvedValue) || resolvedValue instanceof Error;

                if (predicate(resolvedValue) && !throwsError) {
                    value = resolvedValue;
                    break;
                }
            } catch (err) {} // eslint-disable-line no-empty
        }

        return value;
    }
}

export default ConfigStrategyList;
