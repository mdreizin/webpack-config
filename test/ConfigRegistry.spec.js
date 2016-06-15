import ConfigRegistry from '../src/ConfigRegistry';

describe('ConfigRegistry', () => {
    let registry;

    beforeEach(() => {
        registry = new ConfigRegistry();
    });

    describe('#getOrSet()', () => {
        it('should add `value` if absent', () => {
            let value = new Date('2016-05-13'),
                key = Object.create(null),
                factory = () => { return value; };

            expect(registry.getOrSet(key, factory)).toEqual(value);
            expect(registry.getOrSet(key, factory)).toEqual(value);
        });
    });
});
