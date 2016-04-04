import ConfigPatternCache from '../src/ConfigPatternCache';

describe('ConfigPatternCache', () => {
    let patternCache;

    beforeEach(() => {
        patternCache = new ConfigPatternCache();
    });

    describe('.INSTANCE', () => {
        it('should return instance of `ConfigPatternCache`', () => {
            expect(ConfigPatternCache.INSTANCE).toEqual(jasmine.any(ConfigPatternCache));
        });
    });

    describe('#set()', () => {
        it('should always add compiled `RegExp`', () => {
            patternCache.set('foo', 'foo');
            patternCache.set(1, 2);

            expect(patternCache.get('foo')).toEqual(ConfigPatternCache.compile('foo'));
            expect(patternCache.get(1)).toEqual(ConfigPatternCache.compile('2'));
        });
    });

    describe('#getOrSet()', () => {
        it('should `.compile` to `RegExp` once', () => {
            let value1 = patternCache.getOrSet('value');
            let value2 = patternCache.getOrSet('value');

            expect(value1).toBe(value2);
            expect(value1).toEqual(value2);
        });
    });

    describe('.compile()', () => {
        it('should compile to `RegExp`', () => {
            expect(ConfigPatternCache.compile('foo')).toEqual(jasmine.any(RegExp));
        });
    });
});
