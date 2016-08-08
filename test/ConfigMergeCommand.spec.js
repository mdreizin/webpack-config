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
        it('should execute successfully for `Object~>Object`', () => {
            command.execute(config, {
                foo: {
                    bar: 'bar1'
                }
            });
            command.execute(config, {
                foo: {
                    bar: 'bar2'
                }
            });
            command.execute(config, x => {
                expect(x).toBe(config);

                return {
                    foo: {
                        bar: 'bar3'
                    }
                };
            });
            command.execute(config, () => {});

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'bar3'
                }
            });
        });

        it('should execute successfully for `Object~>Object`', () => {
            command.execute(config, {
                foo: {
                    bar: 'bar1'
                }
            });
            command.execute(config, {
                foo: {
                    bar: 'bar2'
                }
            });
            command.execute(config, x => {
                expect(x).toBe(config);

                return {
                    foo: {
                        bar: 'bar3'
                    }
                };
            });
            command.execute(config, () => {});

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'bar3'
                }
            });
        });

        it('should execute successfully for `Object[]~>Object[]`', () => {
            command.execute(config, {
                arr: ['foo']
            });
            command.execute(config, {
                arr: ['bar']
            });

            expect(config.toObject()).toEqual({
                arr: ['foo', 'bar']
            });
        });

        it('should execute successfully for `Object[]~>Object`', () => {
            command.execute(config, {
                arr: [{
                    foo: 'bar1'
                }]
            });
            command.execute(config, {
                arr: {
                    foo: 'bar1'
                }
            });

            expect(config.toObject()).toEqual({
                arr: [{
                    foo: 'bar1'
                }, {
                    foo: 'bar1'
                }]
            });
        });

        it('should execute successfully for `Object~>Object[]`', () => {
            command.execute(config, {
                obj: {
                    foo: 'foo1'
                }
            });
            command.execute(config, {
                obj: [{
                    bar: 'bar1'
                }]
            });

            expect(config.toObject()).toEqual({
                obj: [{
                    foo: 'foo1'
                }, {
                    bar: 'bar1'
                }]
            });
        });
    });
});
