import Config from '../src/Config';
import TestFactory from './helpers/TestFactory';

describe('ConfigOptionsResolver', () => {
    let config,
        optionsResolver,
        environment;

    beforeEach(() => {
        config = TestFactory.createConfig();
        optionsResolver = TestFactory.createConfigOptionsResolver();
        environment = optionsResolver.nameResolver.environment;
    });

    describe('#resolve()', () => {
        beforeEach(() => {
            environment.setAll({
                foo: 'foo1',
                bar: 'bar1'
            });
        });

        it('should resolve `Function` values', () => {
            const obj = {
                    foo: 'foo1'
                },
                options = optionsResolver.resolve(config, x => {
                    expect(x).toEqual(jasmine.any(Config));

                    return obj;
                });

            expect(options).toEqual(obj);
        });

        it('should resolve `Object` values', () => {
            const obj = {
                    bar: 'bar1'
                },
                options = optionsResolver.resolve(config, obj);

            expect(options).toEqual(obj);
        });

        it('should resolve `environment` variables', () => {
            const options = optionsResolver.resolve(config, {
                foo: '[foo]',
                deep: {
                    bar: '[bar]'
                }
            });

            expect(options).toEqual({
                foo: 'foo1',
                deep: {
                    bar: 'bar1'
                }
            });
        });
    });
});
