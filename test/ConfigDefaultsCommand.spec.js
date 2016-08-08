import ConfigDefaultsCommand from '../src/ConfigDefaultsCommand';
import MockConfigContainer from './helpers/MockConfigContainer';
import getConfigCommand from './helpers/getConfigCommand';

describe('ConfigDefaultsCommand', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {Config}
         */
        config,
        /**
         * @type {ConfigDefaultsCommand}
         */
        command;

    beforeEach(() => {
        [config, command] = getConfigCommand(container, ConfigDefaultsCommand);
    });

    describe('#execute()', () => {
        it('should execute successfully', () => {
            const date1 = new Date(),
                date2 = new Date();

            command.execute(config, {
                foo: 'foo1',
                date: date1
            });
            command.execute(config, {
                foo: 'foo2',
                bar: ['bar2'],
                date: date2
            });
            command.execute(config, x => {
                expect(x).toBe(config);

                return {
                    foo: 'foo2'
                };
            });
            command.execute(() => {});

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: ['bar2'],
                date: date1
            });
        });
    });
});
