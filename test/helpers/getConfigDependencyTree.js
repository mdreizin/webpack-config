/**
 * @param {Config} config
 * @returns {String[]}
 */
export default config => {
    const paths = [];

    for (const {node} of config.dependencyTree) {
        paths.push(node.root.filename);
    }

    return paths;
};
