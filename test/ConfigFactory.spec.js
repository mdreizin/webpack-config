import Config from '../src/Config';
import MultiConfig from '../src/ConfigList';
import ConfigFactory from '../src/ConfigFactory';

describe('ConfigFactory', () => {
    describe('.createConfig()', () => {
        it('should create `Config` from `Function`', () => {
            let config = ConfigFactory.createConfig(() => {
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
            let config = ConfigFactory.createConfig({
                foo: 'foo1'
            });

            expect(config).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                foo: 'foo1'
            });
        });

        it('should create `MultiConfig` from `Object[]`', () => {
            let configs = ConfigFactory.createConfig([{
                foo: 'foo1'
            }]);

            expect(configs).toEqual(jasmine.any(MultiConfig));
            expect(configs.length).toEqual(1);
            expect(configs[0]).toEqual(jasmine.any(Config));
            expect(configs[0].toObject()).toEqual({
                foo: 'foo1'
            });
        });
    });
});
