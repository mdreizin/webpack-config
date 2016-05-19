import {
    existsSync
} from 'fs';
import {
    dirname,
    sep,
    join,
    basename
} from 'path';
import {
    dropRight,
    includes
} from 'lodash';
import ConfigLoader from './ConfigLoader';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigServiceLocator from './ConfigServiceLocator';

/**
 * @private
 * @type {WeakMap}
 */
const LOADER = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const PATH_RESOLVER = new WeakMap();

class ConfigFinder {
    /**
     * @param {ConfigLoader} loader
     * @param {ConfigPathResolver} pathResolver
     */
    constructor(loader, pathResolver) {
        LOADER.set(this, loader);
        PATH_RESOLVER.set(this, pathResolver);
    }

    /**
     * @readonly
     * @type {ConfigLoader}
     */
    get loader() {
        return LOADER.get(this);
    }

    /**
     * @readonly
     * @type {ConfigPathResolver}
     */
    get pathResolver() {
        return PATH_RESOLVER.get(this);
    }

    /**
     * @param {String} filename
     * @param {String[]} [visited]
     * @returns {Config|ConfigList}
     */
    findClosestConfig(filename, visited = []) {
        if (includes(visited, filename)) {
            return null;
        }

        filename = this.pathResolver.resolvePath(filename);

        visited.push(filename);

        if (existsSync(filename)) {
            return this.loader.loadConfig(filename);
        }

        const paths = dirname(filename).split(sep);

        filename = join(dropRight(paths).join(sep), basename(filename));

        return this.findClosestConfig(filename, visited);
    }

    /**
     * @readonly
     * @type {ConfigFinder}
     */
    static get INSTANCE() {
        return ConfigServiceLocator.getOrCreate(this, () => new ConfigFinder(ConfigLoader.INSTANCE, ConfigPathResolver.INSTANCE));
    }
}

export default ConfigFinder;
