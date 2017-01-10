import {
    Container,
    Transient
} from 'constitute';
import Config from './Config';
import ConfigCache from './ConfigCache';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigStringResolver from './ConfigStringResolver';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigLoader from './ConfigLoader';
import ConfigFactory from './ConfigFactory';
import ConfigOptionsResolver from './ConfigOptionsResolver';
import ConfigDefaultsCommand from './ConfigDefaultsCommand';
import ConfigMergeCommand from './ConfigMergeCommand';
import ConfigExtendCommand from './ConfigExtendCommand';
import ConfigCommandFactory from './ConfigCommandFactory';

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
        container.bindClass(ConfigStringResolver, ConfigStringResolver, [
            ConfigEnvironment,
            ConfigPatternCache
        ]);
        container.bindClass(ConfigPathResolver, ConfigPathResolver, [
            ConfigStringResolver
        ]);
        container.bindClass(ConfigLoader, ConfigLoader, [
            ConfigPathResolver,
            ConfigCache,
            ConfigFactory
        ]);
        container.bindClass(ConfigFactory, ConfigFactory, [
            ConfigContainer
        ]);
        container.bindClass(Config, Config, Transient.with([
            ConfigCommandFactory
        ]));
        container.bindClass(ConfigOptionsResolver, ConfigOptionsResolver, [
            ConfigStringResolver
        ]);
        container.bindClass(ConfigDefaultsCommand, ConfigDefaultsCommand, [
            ConfigOptionsResolver
        ]);
        container.bindClass(ConfigMergeCommand, ConfigMergeCommand, [
            ConfigOptionsResolver
        ]);
        container.bindClass(ConfigExtendCommand, ConfigExtendCommand, [
            ConfigOptionsResolver,
            ConfigLoader,
            ConfigFactory
        ]);
        container.bindClass(ConfigCommandFactory, ConfigCommandFactory, [
            ConfigContainer
        ]);
    }

    /**
     * @param {*} T
     * @returns {*}
     */
    resolve(T) {
        return this.container.constitute(T);
    }

    /**
     * @param {*} T
     * @returns {Function}
     */
    proxy(T) {
        return () => this.resolve(T);
    }
}

export default ConfigContainer;
