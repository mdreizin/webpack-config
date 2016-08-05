import {
    Transient
} from 'constitute';
import ConfigContainer from '../../src/ConfigContainer';
import ConfigPatternCache from '../../src/ConfigPatternCache';
import ConfigEnvironment from '../../src/ConfigEnvironment';
import ConfigNameResolver from '../../src/ConfigNameResolver';
import ConfigPathResolver from '../../src/ConfigPathResolver';
import ConfigCache from '../../src/ConfigCache';
import ConfigLoader from '../../src/ConfigLoader';
import ConfigFactory from '../../src/ConfigFactory';
import ConfigFinder from '../../src/ConfigFinder';
import Config from '../../src/Config';
import ConfigBuilder from '../../src/ConfigBuilder';
import ConfigOptionsResolver from '../../src/ConfigOptionsResolver';
import ConfigDefaultsCommand from '../../src/ConfigDefaultsCommand';

/**
 * @class
 * @extends {MockConfigContainer}
 */
class MockConfigContainer extends ConfigContainer {
    /**
     * @override
     */
    setUp() {
        const container = this.container;

        container.bindValue(ConfigContainer, this);
        container.bindClass(ConfigPatternCache, ConfigPatternCache, Transient.with([]));
        container.bindClass(ConfigEnvironment, ConfigEnvironment, Transient.with([]));
        container.bindClass(ConfigNameResolver, ConfigNameResolver, Transient.with([
            ConfigEnvironment,
            ConfigPatternCache
        ]));
        container.bindClass(ConfigPathResolver, ConfigPathResolver, Transient.with([
            ConfigNameResolver
        ]));
        container.bindClass(ConfigCache, ConfigCache, Transient.with([
            ConfigEnvironment
        ]));
        container.bindClass(ConfigLoader, ConfigLoader, Transient.with([
            ConfigPathResolver,
            ConfigCache,
            ConfigFactory
        ]));
        container.bindClass(ConfigFactory, ConfigFactory, Transient.with([
            ConfigContainer
        ]));
        container.bindClass(ConfigFinder, ConfigFinder, Transient.with([
            ConfigPathResolver
        ]));
        container.bindClass(Config, Config, Transient.with([
            ConfigLoader,
            ConfigFactory,
            ConfigDefaultsCommand
        ]));
        container.bindClass(ConfigBuilder, ConfigBuilder, Transient.with([
            ConfigFactory
        ]));
        container.bindClass(ConfigOptionsResolver, ConfigOptionsResolver, Transient.with([
            ConfigNameResolver
        ]));
        container.bindClass(ConfigDefaultsCommand, ConfigDefaultsCommand, Transient.with([
            ConfigOptionsResolver
        ]));
    }
}

export default MockConfigContainer;
