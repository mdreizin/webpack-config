import ConfigMergeCommand from '../src/ConfigMergeCommand';
import MockConfigContainer from './helpers/MockConfigContainer';
import getConfigCommand from './helpers/getConfigCommand';

describe('ConfigMergeCommand', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {Config}
         */
        config,
        /**
         * @type {ConfigMergeCommand}
         */
        command;

    beforeEach(() => {
        [config, command] = getConfigCommand(container, ConfigMergeCommand);
    });

    describe('#execute()', () => {
        it('should execute successfully for `Function~>(Config|Undefined)`', () => {
            command.execute(config, x => {
                expect(x).toBe(config);

                return {
                    foo: {
                        bar: 'fn1'
                    }
                };
            });
            command.execute(config, () => {});
            command.execute(config, () => {
                return {
                    foo: {
                        bar: 'fn2'
                    }
                };
            });

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'fn2'
                }
            });
        });

        it('should execute successfully for `Object~>Object`', () => {
            command.execute(config, {
                foo: {
                    bar: 'obj1'
                }
            });
            command.execute(config, {
                foo: {
                    bar: 'obj2'
                }
            });

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'obj2'
                }
            });
        });

        it('should execute successfully for `Object[]~>Object[]`', () => {
            command.execute(config, {
                arr: ['arr1']
            });
            command.execute(config, {
                arr: ['arr2']
            });

            expect(config.toObject()).toEqual({
                arr: ['arr1', 'arr2']
            });
        });

        it('should execute successfully for `Object[]~>Object`', () => {
            command.execute(config, {
                arr: [{
                    foo: 'arr1'
                }]
            });
            command.execute(config, {
                arr: {
                    foo: 'arr2'
                }
            });

            expect(config.toObject()).toEqual({
                arr: [{
                    foo: 'arr1'
                }, {
                    foo: 'arr2'
                }]
            });
        });

        it('should execute successfully for `Object~>Object[]`', () => {
            command.execute(config, {
                obj: {
                    foo: 'obj1'
                }
            });
            command.execute(config, {
                obj: [{
                    bar: 'obj2'
                }]
            });

            expect(config.toObject()).toEqual({
                obj: [{
                    foo: 'obj1'
                }, {
                    bar: 'obj2'
                }]
            });
        });
    });
});
