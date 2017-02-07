import ConfigStringResolver from '../src/ConfigStringResolver';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigStringResolver', () => {
    const container = new MockConfigContainer();

    let stringResolver,
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

        /**
         * @private
         * @param {String} before
         * @param {String} after
         * @returns {String}
         */
        const resolve = (before, after) => {
            expect(stringResolver.resolve(before)).toEqual(after);
        };

        it('should resolve `[foo1]` with `foo1`', () => {
            resolve('webpack.[foo1].config.js', 'webpack.foo1.config.js');
        });

        it('should resolve `[bar1]` with `bar1`', () => {
            resolve('webpack.[bar1].config.js', 'webpack.bar1.config.js');
        });

        it('should resolve `[foo2]` with `foo2', () => {
            resolve('webpack.[foo2].config.js', 'webpack.foo2.config.js');
        });

        it('should resolve `[bar2]` with `foo2', () => {
            resolve('webpack.[bar2].config.js', 'webpack.foo2.config.js');
        });

        it('should not resolve `unknown` variables', () => {
            resolve('webpack.[name].config.js', 'webpack.[name].config.js');
        });
    });
});
