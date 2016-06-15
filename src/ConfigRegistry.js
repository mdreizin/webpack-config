/**
 * @class
 * @extends {Map}
 */
class ConfigRegistry extends Map {
    /**
     * @param {*} key
     * @param {Function} valueLoader
     * @returns {*}
     */
    getOrSet(key, valueLoader) {
        if (!this.has(key)) {
            this.set(key, valueLoader());
        }

        return this.get(key);
    }

    /**
     * @readonly
     * @type {ConfigRegistry}
     */
    static get INSTANCE() {
        return new ConfigRegistry();
    }
}

export default ConfigRegistry;
