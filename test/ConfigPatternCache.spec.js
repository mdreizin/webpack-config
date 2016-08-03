import ConfigPatternCache from '../src/ConfigPatternCache';

describe('ConfigPatternCache', () => {
    let patternCache;

    beforeEach(() => {
        patternCache = new ConfigPatternCache();
    });

    describe('#set()', () => {
        it('should always add compiled `Function`', () => {
            patternCache.set('foo', 'foo');
            patternCache.set(1, 2);

            expect(patternCache.get('foo')).toEqual(jasmine.any(Function));
            expect(patternCache.get(1)).toEqual(jasmine.any(Function));
        });
    });

    describe('#getOrSet()', () => {
        it('should `.compile` to `Function` once', () => {
            const value1 = patternCache.getOrSet('value'),
                value2 = patternCache.getOrSet('value');

            expect(value1).toBe(value2);
            expect(value1).toEqual(value2);
        });
    });

    describe('#compile()', () => {
        it('should compile to `Function`', () => {
            expect(patternCache.compile('foo')).toEqual(jasmine.any(Function));
        });
    });

    describe('#eval()', () => {
        it('should replace `[foo]` with `bar`', () => {
            const value = patternCache.eval('[foo]-[foo]', {
                foo: 'bar'
            });

            expect(value).toEqual('bar-bar');
        });

        it('should replace `{foo}` with `bar`', () => {
            patternCache.interpolate = /{([\s\S]+?)}/g;

            const value = patternCache.eval('{foo}-{foo}', {
                foo: 'bar'
            });

            expect(value).toEqual('bar-bar');
        });
    });
});
