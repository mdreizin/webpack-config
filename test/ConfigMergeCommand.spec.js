import Config from '../src/Config';
import ConfigMergeCommand from '../src/ConfigMergeCommand';
import MockConfigContainer from './helpers/MockConfigContainer';

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
        config = container.resolve(Config);
        command = container.resolve(ConfigMergeCommand);
    });

    describe('#execute()', () => {
        it('should execute successfully', () => {
            command.execute(config, {
                foo: {
                    bar: 'bar1'
                },
                bar: ['bar1']
            });
            command.execute(config, {
                foo: {
                    bar: 'bar2'
                },
                bar: ['bar2']
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
                },
                bar: ['bar1', 'bar2']
            });
        });
    });
});
