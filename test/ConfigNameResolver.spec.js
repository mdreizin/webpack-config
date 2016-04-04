import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigPatternCache from '../src/ConfigPatternCache';
import ConfigNameResolver from '../src/ConfigNameResolver';

describe('ConfigNameResolver', () => {
    let environment,
        patternCache,
        nameResolver;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
    });

    describe('.INSTANCE', () => {
        it('should return instance of `ConfigNameResolver`', () => {
            expect(ConfigNameResolver.INSTANCE).toEqual(jasmine.any(ConfigNameResolver));
        });
    });

    describe('#resolveName()', () => {
        beforeEach(() => {
            environment.setAll({
                foo1: 'foo1',
                bar1: 'bar1',
                foo2: () => 'foo2',
                bar2: x => x.valueOf('foo2')
            });
        });

        it('should replace `[foo1]` with `foo1`', () => {
            let filename = nameResolver.resolveName('webpack.[foo1].config.js');

            expect(filename).toEqual('webpack.foo1.config.js');
        });

        it('should replace `[bar1]` with `bar1`', () => {
            let filename = nameResolver.resolveName('webpack.[bar1].config.js');

            expect(filename).toEqual('webpack.bar1.config.js');
        });

        it('should replace `[foo2]` with `foo2', () => {
            let filename = nameResolver.resolveName('webpack.[foo2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });

        it('should replace `[bar2]` with `foo2', () => {
            let filename = nameResolver.resolveName('webpack.[bar2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });
    });
});
