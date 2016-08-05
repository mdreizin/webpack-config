import {
    Transient
} from 'constitute';
import ConfigContainer from '../../src/ConfigContainer';
import ConfigPatternCache from '../../src/ConfigPatternCache';

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
    }
}

export default MockConfigContainer;
