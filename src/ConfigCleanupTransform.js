/**
 * @private
 * @type {String[]}
 */
const EXCLUDE_FIELDS = [
    'filename',
    'DEPENDENCY_TREE'
];

/**
 * Removes system properties
 * @param {Config} config
 * @returns {Config}
 */
export default config => {
    EXCLUDE_FIELDS.forEach(function(name) {
        delete config[name];
    });

    return config;
};
