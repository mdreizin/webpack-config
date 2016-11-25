import Config from '../src/Config';
import ConfigMergeCommand from '../src/ConfigMergeCommand';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigMergeCommand', () => {
    const container = new MockConfigContainer();

    let config,
        command;

    beforeEach(() => {
        config = container.resolve(Config);
        command = container.resolve(ConfigMergeCommand);
    });

    describe('#execute()', () => {
        it('should execute successfully for `Function~>(Config|Undefined)`', () => {
            command.execute(config, x => {
                expect(x).toBe(config);

                return {
                    obj: {
                        obj1: 'fn1'
                    }
                };
            });
            command.execute(config, () => {});
            command.execute(config, () => {
                return {
                    obj: {
                        obj1: 'fn2'
                    }
                };
            });

            expect(config.toObject()).toEqual({
                obj: {
                    obj1: 'fn2'
                }
            });
        });

        it('should execute successfully for `Object~>Object`', () => {
            command.execute(config, {
                obj: {
                    obj1: 'obj1'
                }
            });
            command.execute(config, {
                obj: {
                    obj1: 'obj2'
                }
            });

            expect(config.toObject()).toEqual({
                obj: {
                    obj1: 'obj2'
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
                    arr1: 'arr1'
                }]
            });
            command.execute(config, {
                arr: {
                    arr2: 'arr2'
                }
            });

            expect(config.toObject()).toEqual({
                arr: [{
                    arr1: 'arr1'
                }, {
                    arr2: 'arr2'
                }]
            });
        });

        it('should execute successfully for `Object~>Object[]`', () => {
            command.execute(config, {
                obj: {
                    obj1: 'obj1'
                }
            });
            command.execute(config, {
                obj: [{
                    obj2: 'obj2'
                }]
            });

            expect(config.toObject()).toEqual({
                obj: [{
                    obj1: 'obj1'
                }, {
                    obj2: 'obj2'
                }]
            });
        });
    });
});
