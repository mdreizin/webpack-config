import ConfigPatternCache from '../src/ConfigPatternCache';
import MockConfigContainer from './helpers/MockConfigContainer';

describe('ConfigPatternCache', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {ConfigPatternCache}
         */
        patternCache;

    beforeEach(() => {
        patternCache = container.resolve(ConfigPatternCache);
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
            expect(patternCache.eval('[foo]-[foo]', {
                foo: 'bar'
            })).toEqual('bar-bar');

            expect(patternCache.eval('[ foo ]-[ foo ]', {
                foo: 'bar'
            })).toEqual('bar-bar');
        });

        it('should not replace `JSON.stringify`-strings', () => {
            const str = JSON.stringify({
                foo: [
                    { x: 1 },
                    { y: 2 },
                    { z: 3 }
                ]
            });

            expect(patternCache.eval(str, {})).toEqual(str);
        });
    });

    describe('#interpolate', () => {
        it('should replace `{foo}` with `bar` using custom `interpolate`', () => {
            patternCache.interpolate = /{([\w\s]+?)}/g;

            const value = patternCache.eval('{foo}-{foo}', {
                foo: 'bar'
            });

            expect(value).toEqual('bar-bar');
        });
    });
});
