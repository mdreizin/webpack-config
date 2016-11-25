import Config from '../src/Config';
import ConfigList from '../src/ConfigList';
import ConfigFactory from '../src/ConfigFactory';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigFactory', () => {
    const container = new MockConfigContainer();

    let factory;

    beforeEach(() => {
        factory = container.resolve(ConfigFactory);
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

        it('should create `ConfigList` from `Object[]`', () => {
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
