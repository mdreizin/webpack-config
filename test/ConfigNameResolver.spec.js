import ConfigNameResolver from '../src/ConfigNameResolver';
import MockConfigContainer from './helpers/MockConfigContainer';

describe('ConfigNameResolver', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {ConfigNameResolver}
         */
        nameResolver,
        environment;

    beforeEach(() => {
        nameResolver = container.resolve(ConfigNameResolver);
        environment = nameResolver.environment;
    });

    describe('#resolve()', () => {
        beforeEach(() => {
            environment.setAll({
                foo1: 'foo1',
                bar1: 'bar1',
                foo2: () => 'foo2',
                bar2: x => x.valueOf('foo2')
            });
        });

        it('should resolve `[foo1]` with `foo1`', () => {
            const filename = nameResolver.resolve('webpack.[foo1].config.js');

            expect(filename).toEqual('webpack.foo1.config.js');
        });

        it('should resolve `[bar1]` with `bar1`', () => {
            const filename = nameResolver.resolve('webpack.[bar1].config.js');

            expect(filename).toEqual('webpack.bar1.config.js');
        });

        it('should resolve `[foo2]` with `foo2', () => {
            const filename = nameResolver.resolve('webpack.[foo2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });

        it('should resolve `[bar2]` with `foo2', () => {
            const filename = nameResolver.resolve('webpack.[bar2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });

        it('should not resolve `unknown` variables', () => {
            const filename = nameResolver.resolve('webpack.[name].config.js');

            expect(filename).toEqual('webpack.[name].config.js');
        });
    });
});
