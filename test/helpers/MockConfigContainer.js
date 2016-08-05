import {
    Transient
} from 'constitute';
import ConfigContainer from '../../src/ConfigContainer';
import ConfigPatternCache from '../../src/ConfigPatternCache';
import ConfigEnvironment from '../../src/ConfigEnvironment';
import ConfigNameResolver from '../../src/ConfigNameResolver';
import ConfigPathResolver from '../../src/ConfigPathResolver';

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
    }
}

export default MockConfigContainer;
