import {
    sep,
    join,
    basename
} from 'path';
import {
    trimEnd,
    dropRight,
    includes
} from 'lodash';
import {
    sync,
    Glob
} from 'glob';
import glob2base from 'glob2base';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigRegistry from './ConfigRegistry';

/**
 * @private
 * @type {WeakMap}
 */
const PATH_RESOLVER = new WeakMap();

/**
 * @private
 * @type {Object}
 */
const GLOB_OPTIONS = {
    cache: true,
    dot: false,
    silent: true
};

/**
 * @class
 */
class ConfigFinder {
    /**
     * @constructor
     * @param {ConfigPathResolver} pathResolver
     */
    constructor(pathResolver) {
        PATH_RESOLVER.set(this, pathResolver);
    }

    /**
     * @readonly
     * @type {ConfigPathResolver}
     */
    get pathResolver() {
        return PATH_RESOLVER.get(this);
    }

    /**
     * @param {String} pattern
     * @param {String[]} [visited]
     * @returns {String[]}
     */
    findClosestConfigs(pattern, visited = []) {
        pattern = this.pathResolver.resolvePath(pattern);

        if (includes(visited, pattern)) {
            return [];
        }

        visited.push(pattern);

        const configs = this.findConfigs(pattern);

        if (configs.length > 0) {
            return configs;
        }

        const cwd = glob2base(new Glob(pattern)),
            paths = trimEnd(cwd, sep).split(sep);

        pattern = join(dropRight(paths).join(sep), basename(pattern));

        return this.findClosestConfigs(pattern, visited);
    }

    /**
     * @param {String} pattern
     * @returns {String[]}
     */
    findConfigs(pattern) {
        pattern = this.pathResolver.resolvePath(pattern);

        return sync(pattern, GLOB_OPTIONS).map(filename => this.pathResolver.resolvePath(filename));
    }

    /**
     * @readonly
     * @type {ConfigFinder}
     */
    static get INSTANCE() {
        return ConfigRegistry.INSTANCE.getOrSet(this, () => new ConfigFinder(ConfigPathResolver.INSTANCE));
    }
}

export default ConfigFinder;
