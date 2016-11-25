import Config from '../src/Config';
import ConfigDefaultsCommand from '../src/ConfigDefaultsCommand';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigDefaultsCommand', () => {
    const container = new MockConfigContainer();

    let config,
        command;

    beforeEach(() => {
        config = container.resolve(Config);
        command = container.resolve(ConfigDefaultsCommand);
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
