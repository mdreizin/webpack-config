import ConfigEnvironment from '../src/ConfigEnvironment';

describe('ConfigEnvironment', () => {
    let environment;

    beforeEach(() => {
        environment = new ConfigEnvironment();
    });

    describe('#setAll()', () => {
        it('should add `Object`', () => {
            environment.setAll({
                foo: 'foo',
                bar: 'bar'
            });

            expect(environment.get('foo')).toEqual('foo');
            expect(environment.get('bar')).toEqual('bar');
        });

        it('should add `Object[]`', () => {
            environment.setAll({
                foo: 'foo'
            }, {
                bar: 'bar'
            });

            expect(environment.get('foo')).toEqual('foo');
            expect(environment.get('bar')).toEqual('bar');
        });
    });

    describe('#valueOf()', () => {
        it('should `#get()` and resolve `Function`', () => {
            environment.setAll({
                foo: () => 'foo',
                bar: x => x.valueOf('foo')
            });

            expect(environment.valueOf('foo')).toEqual('foo');
            expect(environment.valueOf('bar')).toEqual('foo');
        });

        it('should `#get()`', () => {
            environment.set('foo', 'bar');

            expect(environment.valueOf('foo')).toEqual('bar');
        });
    });

    describe('#getOrDefault()', () => {
        it('should return `defaultValue` when `#valueOf()` returns `undefined`', () => {
            expect(environment.getOrDefault('foo', 'bar')).toEqual('bar');

            environment.set('foo', 'foo');

            expect(environment.getOrDefault('foo', 'bar')).toEqual('foo');
        });
    });
});
