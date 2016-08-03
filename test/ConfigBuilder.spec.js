import ConfigLoader from '../src/ConfigLoader';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPatternCache from '../src/ConfigPatternCache';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigCache from '../src/ConfigCache';
import ConfigFactory from '../src/ConfigFactory';
import ConfigBuilder from '../src/ConfigBuilder';

describe('ConfigBuilder', () => {
    let environment,
        nameResolver,
        pathResolver,
        cache,
        loader,
        patternCache,
        factory,
        builder;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
        cache = new ConfigCache(environment);
        loader = new ConfigLoader(pathResolver, cache);
        factory = new ConfigFactory(loader);
        builder = new ConfigBuilder(factory);
    });

    describe('#merge()', () => {
        it('should merge `values`', () => {
            const config = builder.merge({
                foo: {
                    bar: 'bar1'
                },
                bar: ['bar1']
            }).build();

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'bar1'
                },
                bar: ['bar1']
            });
        });
    });

    describe('#defaults()', () => {
        it('should not add extra `values`', () => {
            const config = builder.merge({
                foo: 'foo1'
            }).defaults({
                foo: 'foo2',
                bar: ['bar2']
            }).build();

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: ['bar2']
            });
        });
    });

    describe('#extend()', () => {
        it('should extend using `String`', () => {
            const config = builder.extend('./test/fixtures/webpack.1.config.js').build();

            expect(config.toObject()).toEqual({
                tags: [
                    'config1',
                    'config2',
                    'config3',
                    'config5',
                    'config4'
                ]
            });
        });
    });

    describe('#copyOf()', () => {
        it('should do copy of `Config`', () => {
            const config = builder.merge({
                foo: 'bar1'
            }).copyOf({
                foo: 'bar2',
                bar: 'foo1'
            }).build();

            expect(config.toObject()).toEqual({
                foo: 'bar1',
                bar: 'foo1'
            });
        });

        it('should do copy of `ConfigList`', () => {
            const config = builder.copyOf([{
                foo: 'foo1',
                bar: 'bar1'
            }]).merge({
                foo: 'foo2'
            }).build();

            expect(config.map(x => x.toObject())).toEqual([{
                foo: 'foo2',
                bar: 'bar1'
            }]);
        });
    });

    describe('#applyHooks()', () => {
        it('should apply hooks for `Config`', () => {
            const config = builder.merge({
                foo: 'foo1',
                bar: 'bar1'
            }).applyHooks({
                foo: () => 'foo2',
                bar: 'bar2',
                x: () => {}
            }).build();

            expect(config.toObject()).toEqual({
                foo: 'foo2',
                bar: 'bar2'
            });
        });

        it('should apply hooks for `ConfigList`', () => {
            const config = builder.copyOf([{
                foo: 'foo1',
                bar: 'bar1'
            }]).applyHooks({
                foo: () => 'foo2',
                bar: 'bar2',
                x: () => {}
            }).build();

            expect(config.map(x => x.toObject())).toEqual([{
                foo: 'foo2',
                bar: 'bar2'
            }]);
        });
    });
});
