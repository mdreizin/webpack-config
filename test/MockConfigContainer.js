import {
    Transient
} from 'constitute';
import ConfigContainer from '../src/ConfigContainer';
import ConfigPatternCache from '../src/ConfigPatternCache';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigStringResolver from '../src/ConfigStringResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigCache from '../src/ConfigCache';
import ConfigLoader from '../src/ConfigLoader';
import ConfigFactory from '../src/ConfigFactory';
import Config from '../src/Config';
import ConfigOptionsResolver from '../src/ConfigOptionsResolver';
import ConfigDefaultsCommand from '../src/ConfigDefaultsCommand';
import ConfigMergeCommand from '../src/ConfigMergeCommand';
import ConfigExtendCommand from '../src/ConfigExtendCommand';
import ConfigCommandFactory from '../src/ConfigCommandFactory';

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
        container.bindClass(ConfigStringResolver, ConfigStringResolver, Transient.with([
            ConfigEnvironment,
            ConfigPatternCache
        ]));
        container.bindClass(ConfigPathResolver, ConfigPathResolver, Transient.with([
            ConfigStringResolver
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
        container.bindClass(Config, Config, Transient.with([
            ConfigCommandFactory
        ]));
        container.bindClass(ConfigOptionsResolver, ConfigOptionsResolver, Transient.with([
            ConfigStringResolver
        ]));
        container.bindClass(ConfigDefaultsCommand, ConfigDefaultsCommand, Transient.with([
            ConfigOptionsResolver
        ]));
        container.bindClass(ConfigMergeCommand, ConfigMergeCommand, Transient.with([
            ConfigOptionsResolver
        ]));
        container.bindClass(ConfigExtendCommand, ConfigExtendCommand, Transient.with([
            ConfigOptionsResolver,
            ConfigLoader,
            ConfigFactory
        ]));
        container.bindClass(ConfigCommandFactory, ConfigCommandFactory, Transient.with([
            ConfigContainer
        ]));
    }
}

export default MockConfigContainer;
