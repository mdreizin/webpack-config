import Config from '../../src/Config';
import ConfigLoader from '../../src/ConfigLoader';
import ConfigEnvironment from '../../src/ConfigEnvironment';
import ConfigNameResolver from '../../src/ConfigNameResolver';
import ConfigPatternCache from '../../src/ConfigPatternCache';
import ConfigPathResolver from '../../src/ConfigPathResolver';
import ConfigCache from '../../src/ConfigCache';
import ConfigFactory from '../../src/ConfigFactory';
import ConfigBuilder from '../../src/ConfigBuilder';
import ConfigFinder from '../../src/ConfigFinder';
import ConfigOptionsResolver from '../../src/ConfigOptionsResolver';

class TestFactory {
    /**
     * @returns {ConfigBuilder}
     */
    static createConfigBuilder() {
        const factory = TestFactory.createConfigFactory();

        return new ConfigBuilder(factory);
    }

    /**
     * @returns {ConfigCache}
     */
    static createConfigCache() {
        return new ConfigCache(TestFactory.createConfigEnvironment());
    }

    /**
     * @return {ConfigEnvironment}
     */
    static createConfigEnvironment() {
        return new ConfigEnvironment();
    }

    /**
     * @return {ConfigFactory}
     */
    static createConfigFactory() {
        const loader = TestFactory.createConfigLoader();

        return new ConfigFactory(loader);
    }

    /**
     * @return {ConfigFinder}
     */
    static createConfigFinder() {
        const pathResolver = TestFactory.createConfigPathResolver();

        return new ConfigFinder(pathResolver);
    }

    /**
     * @return {ConfigLoader}
     */
    static createConfigLoader() {
        const pathResolver = TestFactory.createConfigPathResolver(),
            cache = TestFactory.createConfigCache();

        return new ConfigLoader(pathResolver, cache);
    }

    /**
     * @return {ConfigNameResolver}
     */
    static createConfigNameResolver() {
        const environment = TestFactory.createConfigEnvironment(),
            patternCache = TestFactory.createConfigPatternCache();

        return new ConfigNameResolver(environment, patternCache);
    }

    /**
     * @return {ConfigPathResolver}
     */
    static createConfigPathResolver() {
        const nameResolver = TestFactory.createConfigNameResolver();

        return new ConfigPathResolver(nameResolver);
    }

    /**
     * @return {ConfigPatternCache}
     */
    static createConfigPatternCache() {
        return new ConfigPatternCache();
    }

    /**
     * @return {Config}
     */
    static createConfig() {
        const loader = TestFactory.createConfigLoader();

        return new Config(loader);
    }

    /**
     * @return {ConfigOptionsResolver}
     */
    static createConfigOptionsResolver() {
        const nameResolver = TestFactory.createConfigNameResolver();

        return new ConfigOptionsResolver(nameResolver);
    }
}

export default TestFactory;
