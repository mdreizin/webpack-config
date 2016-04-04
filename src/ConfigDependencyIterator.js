import RecursiveIterator from 'recursive-iterator';

/**
 * @extends {RecursiveIterator}
 */
class ConfigDependencyIterator extends RecursiveIterator {
    /**
     * @param {ConfigDependency} root
     * @param {Number} [bypassMode=0]
     * @param {Boolean} [ignoreCircular=true]
     * @param {Number} [maxDeep]
     */
    constructor(root, bypassMode = 0, ignoreCircular = true, maxDeep) {
        super(root, bypassMode, ignoreCircular, maxDeep);
    }

    /**
     * @override
     */
    isLeaf(any) {
        return super.isLeaf(any) && !any.children.length;
    }

    /**
     * @override
     */
    getStatesOfChildNodes(node, path, deep) {
        return node.children.map(child => this.getState(node, child, child.root.filename, path.concat(child.root.filename), deep + 1));
    }
}

export default ConfigDependencyIterator;
