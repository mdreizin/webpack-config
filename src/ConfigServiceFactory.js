/**
 * @private
 * @type {WeakMap}
 */
const INSTANCE = new WeakMap();

class ConfigServiceFactory {
    /**
     * @param {*} key
     * @param {Function} value
     * @returns {*}
     */
    static createInstanceOnce(key, value) {
        if (!INSTANCE.has(key)) {
            INSTANCE.set(key, value());
        }

        return INSTANCE.get(key);
    }
}

export default ConfigServiceFactory;
