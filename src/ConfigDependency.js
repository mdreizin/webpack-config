import ConfigDependencyIterator from './ConfigDependencyIterator';

/**
 * @private
 * @type {WeakMap}
 */
const ROOT = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const CHILDREN = new WeakMap();

class ConfigDependency {
    /**
     * @param {Config} root
     * @param {ConfigDependency[]} children
     */
    constructor(root, children = []) {
        ROOT.set(this, root);
        CHILDREN.set(this, children);
    }

    /**
     * @readonly
     * @type {Config}
     */
    get root() {
        return ROOT.get(this);
    }

    /**
     * @readonly
     * @type {ConfigDependency[]}
     */
    get children() {
        return CHILDREN.get(this);
    }

    /**
     * @returns {ConfigDependencyIterator}
     */
    [Symbol.iterator]() {
        return new ConfigDependencyIterator(this);
    }
}

export default ConfigDependency;
