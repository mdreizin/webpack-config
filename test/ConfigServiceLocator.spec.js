import ConfigServiceLocator from '../src/ConfigServiceLocator';

describe('ConfigServiceLocator', () => {
    describe('.getOrCreate()', () => {
        it('should create singleton instance', () => {
            let value = new Date('2016-05-13'),
                key = Object.create(null),
                factory = () => { return value; };

            expect(ConfigServiceLocator.getOrCreate(key, factory)).toEqual(value);
            expect(ConfigServiceLocator.getOrCreate(key, factory)).toEqual(value);
        });
    });
});
