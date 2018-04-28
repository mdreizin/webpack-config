import {
    isError
} from 'lodash';

/**
 * @private
 * @type {WeakMap}
 */
const RESOLVERS = new WeakMap();

/**
 * @class
 */
class ConfigStrategyList {
    /**
     * @constructor
     * @param {Function[]} resolvers
     */
    constructor(resolvers) {
        RESOLVERS.set(this, resolvers);
    }

    /**
     * @readonly
     * @type {Function[]}
     */
    get resolvers() {
        return RESOLVERS.get(this);
    }

    /**
     * @param {*} value
     * @param {Function} predicate
     * @returns {*}
     */
    resolve(value, predicate) {
        for (const resolver of this.resolvers) {
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
