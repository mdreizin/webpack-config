import ConfigStringResolver from '../src/ConfigStringResolver';
import MockConfigContainer from './helpers/MockConfigContainer';

describe('ConfigStringResolver', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {ConfigStringResolver}
         */
        stringResolver,
        environment;

    beforeEach(() => {
        stringResolver = container.resolve(ConfigStringResolver);
        environment = stringResolver.environment;
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
            const filename = stringResolver.resolve('webpack.[foo1].config.js');

            expect(filename).toEqual('webpack.foo1.config.js');
        });

        it('should resolve `[bar1]` with `bar1`', () => {
            const filename = stringResolver.resolve('webpack.[bar1].config.js');

            expect(filename).toEqual('webpack.bar1.config.js');
        });

        it('should resolve `[foo2]` with `foo2', () => {
            const filename = stringResolver.resolve('webpack.[foo2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });

        it('should resolve `[bar2]` with `foo2', () => {
            const filename = stringResolver.resolve('webpack.[bar2].config.js');

            expect(filename).toEqual('webpack.foo2.config.js');
        });

        it('should not resolve `unknown` variables', () => {
            const filename = stringResolver.resolve('webpack.[name].config.js');

            expect(filename).toEqual('webpack.[name].config.js');
        });
    });
});
