import Config from '../src/Config';
import ConfigList from '../src/ConfigList';
import ConfigFactory from '../src/ConfigFactory';
import ConfigLoader from '../src/ConfigLoader';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigCache from '../src/ConfigCache';
import ConfigPatternCache from '../src/ConfigPatternCache';

describe('ConfigFactory', () => {
    let environment,
        nameResolver,
        pathResolver,
        cache,
        loader,
        patternCache,
        factory;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
        cache = new ConfigCache(environment);
        loader = new ConfigLoader(pathResolver, cache);
        factory = new ConfigFactory(loader);
    });

    describe('#createConfig()', () => {
        it('should create `Config` from `Function`', () => {
            const config = factory.createConfig(() => {
                return {
                    foo: 'foo1'
                };
            });

            expect(config).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                foo: 'foo1'
            });
        });

        it('should create `Config` from `Object`', () => {
            const config = factory.createConfig({
                foo: 'foo1'
            });

            expect(config).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                foo: 'foo1'
            });
        });

        it('should create `MultiConfig` from `Object[]`', () => {
            const configs = factory.createConfig([{
                foo: 'foo1'
            }]);

            expect(configs).toEqual(jasmine.any(ConfigList));
            expect(configs.length).toEqual(1);
            expect(configs[0]).toEqual(jasmine.any(Config));
            expect(configs[0].toObject()).toEqual({
                foo: 'foo1'
            });
        });
    });
});
