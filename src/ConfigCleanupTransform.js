/**
 * @private
 * @type {String[]}
 */
const SYSTEM_FIELDS = [
    'filename'
];

/**
 * Removes system properties
 * @param {Config} config
 * @returns {Config}
 */
export default config => {
    SYSTEM_FIELDS.forEach(function(name) {
        delete config[name];
    });

    return config;
};
