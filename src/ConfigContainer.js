import {
    Container,
    Transient
} from 'constitute';
import Config from './Config';
import ConfigCache from './ConfigCache';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigLoader from './ConfigLoader';
import ConfigFinder from './ConfigFinder';
import ConfigFactory from './ConfigFactory';
import ConfigBuilder from './ConfigBuilder';
import ConfigOptionsResolver from './ConfigOptionsResolver';
import ConfigDefaultsCommand from './ConfigDefaultsCommand';
import ConfigMergeCommand from './ConfigMergeCommand';

/**
 * @private
 * @type {WeakMap}
 */
const CONTAINER = new WeakMap();

/**
 * @class
 */
class ConfigContainer {
    /**
     * @constructor
     */
    constructor() {
        CONTAINER.set(this, new Container());

        this.setUp();
    }

    /**
     * @protected
     * @type {Container}
     */
    get container() {
        return CONTAINER.get(this);
    }

    /**
     * @protected
     * @returns {void}
     */
    setUp() {
        const container = this.container;

        container.bindValue(ConfigContainer, this);
        container.bindValue(ConfigEnvironment, new ConfigEnvironment(Object.entries(process.env)));
        container.bindClass(ConfigCache, ConfigCache, [
            ConfigEnvironment
        ]);
        container.bindValue(ConfigPatternCache, new ConfigPatternCache());
        container.bindClass(ConfigNameResolver, ConfigNameResolver, [
            ConfigEnvironment,
            ConfigPatternCache
        ]);
        container.bindClass(ConfigPathResolver, ConfigPathResolver, [
            ConfigNameResolver
        ]);
        container.bindClass(ConfigLoader, ConfigLoader, [
            ConfigPathResolver,
            ConfigCache,
            ConfigFactory
        ]);
        container.bindClass(ConfigFinder, ConfigFinder, [
            ConfigPathResolver
        ]);
        container.bindClass(ConfigFactory, ConfigFactory, [
            ConfigContainer
        ]);
        container.bindClass(Config, Config, Transient.with([
            ConfigLoader,
            ConfigFactory,
            ConfigDefaultsCommand,
            ConfigMergeCommand
        ]));
        container.bindClass(ConfigBuilder, ConfigBuilder, Transient.with([
            ConfigFactory
        ]));
        container.bindClass(ConfigOptionsResolver, ConfigOptionsResolver, [
            ConfigNameResolver
        ]);
        container.bindClass(ConfigDefaultsCommand, ConfigDefaultsCommand, [
            ConfigOptionsResolver
        ]);
        container.bindClass(ConfigMergeCommand, ConfigMergeCommand, [
            ConfigOptionsResolver
        ]);
    }

    /**
     * @param {Class} T
     * @returns {*}
     */
    resolve(T) {
        return this.container.constitute(T);
    }

    /**
     * @param {Class} T
     * @returns {Function}
     */
    proxy(T) {
        return () => this.resolve(T);
    }
}

export default ConfigContainer;
