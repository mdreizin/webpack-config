import {
    Transient
} from 'constitute';
import ConfigContainer from '../../src/ConfigContainer';
import ConfigPatternCache from '../../src/ConfigPatternCache';
import ConfigEnvironment from '../../src/ConfigEnvironment';

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
    }
}

export default MockConfigContainer;
