import Config from './Config';

/**
 * @class
 * @extends {Array}
 */
class ConfigList extends Array {
    /**
     * @param {...Object} values
     * @returns {ConfigList}
     */
    static initWith(...values) {
        return ConfigList.from(...values, Config.initWith);
    }
}

export default ConfigList;
