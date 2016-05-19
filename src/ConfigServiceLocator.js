/**
 * @private
 * @type {WeakMap}
 */
const INSTANCE = new WeakMap();

/**
 * @class
 * @private
 */
class ConfigServiceLocator {
    /**
     * @param {*} key
     * @param {Function} factory
     * @returns {*}
     */
    static getOrCreate(key, factory) {
        if (!INSTANCE.has(key)) {
            INSTANCE.set(key, factory());
        }

        return INSTANCE.get(key);
    }
}

export default ConfigServiceLocator;
