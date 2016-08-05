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
            ConfigCache
        ]));
        container.bindClass(ConfigFactory, ConfigFactory, Transient.with([
            ConfigLoader
        ]));
        container.bindClass(ConfigFinder, ConfigFinder, Transient.with([
            ConfigPathResolver
        ]));
        container.bindClass(Config, Config, Transient.with([
            ConfigLoader
        ]));
    }
}

export default MockConfigContainer;
