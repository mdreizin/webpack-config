import Config from '../src/Config';
import ConfigList from '../src/ConfigList';

describe('ConfigList', () => {
    describe('.initWith()', () => {
        it('should return `Config[]`', () => {
            let configs = ConfigList.initWith([{
                foo1: 'foo1'
            }, {
                foo2: 'foo2'
            }]);

            expect(configs).toEqual(jasmine.any(ConfigList));
            expect(configs.every(x => x instanceof Config)).toEqual(true);
        });
    });
});
