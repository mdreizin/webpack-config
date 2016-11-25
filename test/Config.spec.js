import Config from '../src/Config';
import MockConfigContainer from './MockConfigContainer';

describe('Config', () => {
    const container = new MockConfigContainer();

    let config;

    beforeEach(() => {
        config = container.resolve(Config);
    });

    describe('.FILENAME', () => {
        it('should be defined', () => {
            expect(Config.FILENAME).toBeTruthy();
        });
    });

    describe('#defaults()', () => {
        it('should merge successfully', () => {
            const date1 = new Date(),
                date2 = new Date();

            config.merge({
                foo: 'foo1',
                date: date1
            }).defaults({
                foo: 'foo2',
                bar: ['bar2'],
                date: date2
            }, x => {
                expect(x).toBe(config);

                return {
                    foo: 'foo2'
                };
            }, () => {});

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: ['bar2'],
                date: date1
            });
        });
    });

    describe('#merge()', () => {
        it('should merge successfully', function() {
            config.merge({
                foo: 'foo1',
                bar: ['bar1']
            }, {
                foo: 'foo2',
                bar: ['bar2']
            }, x => {
                expect(x).toBe(config);

                return {
                    foo: 'bar3'
                };
            }, () => {});

            expect(config.toObject()).toEqual({
                foo: 'bar3',
                bar: ['bar1', 'bar2']
            });
        });
    });

    describe('#extend()', () => {
        it('should extend successfully using `String`', () => {
            config.extend('./test/fixtures/webpack.1.config.js');

            expect(config.toObject()).toEqual({
                tags: [
                    'config1',
                    'config2',
                    'config3',
                    'config5',
                    'config4'
                ]
            });
        });

        it('should extend successfully `Object<String,Function>`', () => {
            config.extend({
                './test/fixtures/webpack.1.config.js': x => {
                    expect(x).toEqual(jasmine.any(Config));

                    return {
                        tags: [
                            'custom-config1'
                        ]
                    };
                }
            });

            expect(config.toObject()).toEqual({
                tags: [
                    'custom-config1'
                ]
            });
        });

        it('should extend successfully `Object<String,Function[]>`', () => {
            config.extend({
                './test/fixtures/webpack.1.config.js': [
                    x => {
                        expect(x).toEqual(jasmine.any(Config));
                    },
                    x => {
                        expect(x).toEqual(jasmine.any(Config));

                        return {
                            tags: [
                                'custom-config1'
                            ]
                        };
                    },
                    x => {
                        expect(x).toEqual(jasmine.any(Config));

                        return x.merge({
                            tags: [
                                'custom-config2'
                            ]
                        });
                    }
                ]
            });

            expect(config.toObject()).toEqual({
                tags: [
                    'custom-config1',
                    'custom-config2'
                ]
            });
        });
    });

    describe('#clone()', () => {
        it('should return clone of `Config`', () => {
            config.merge({
                foo1: 'foo1'
            });

            const clone = config.clone();

            expect(config).not.toBe(clone);
            expect(clone).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                foo1: 'foo1'
            });
        });
    });

    describe('#toObject()', () => {
        it('should return plain `Object`', () => {
            config.merge({
                foo: 'foo1'
            });

            expect(config.toObject()).toEqual({
                foo: 'foo1'
            });
        });
    });

    describe('#set()', () => {
        it('should add `value` at `path`', () => {
            config.set('foo', {
                bar: 'bar1'
            });

            expect(config.toObject()).toEqual({
                foo: {
                    bar: 'bar1'
                }
            });
        });
    });

    describe('#remove()', () => {
        it('should remove `value` at `path`', () => {
            config.merge({
                foo: 'foo1'
            }).remove('foo');

            expect(config.toObject()).toEqual({});
        });
    });

    describe('#get()', () => {
        it('should get `value` at `path`', () => {
            config.merge({
                foo: 'foo1'
            });

            expect(config.get('foo')).toEqual('foo1');
        });
    });

    describe('#has()', () => {
        it('should return `true` if `path` exist', () => {
            config.merge({
                foo: 'foo1'
            });

            expect(config.has('foo')).toEqual(true);
        });

        it('should return `false` if `path` absent', () => {
            expect(config.has('foo')).toEqual(false);
        });
    });

    describe('#toJSON()', () => {
        it('should be used by `JSON.stringify`', () => {
            config.set('foo', 1);

            expect(JSON.stringify(config)).toEqual('{"foo":1}');
        });
    });
});
