import {
    last
} from 'lodash';
import ConfigTransform from '../src/ConfigTransform';

describe('ConfigTransform', () => {
    let transform,
        transform1 = () => {},
        transform2 = () => {};

    beforeEach(() => {
        transform = new ConfigTransform();
    });

    describe('#set()', () => {
        it('should throw `ReferenceError` if `value` is not `Function`', () => {
            expect(() => {
                transform.set('./test/fixtures/webpack.1.config.js', false);
            }).toThrowError(ReferenceError);
        });

        it('should add `ConfigTransform.DEFAULT` and `ConfigTransform.CLEANUP` by default', () => {
            transform.set('./test/fixtures/webpack.1.config.js');

            expect(transform.get('./test/fixtures/webpack.1.config.js')).toEqual([
                ConfigTransform.DEFAULT,
                ConfigTransform.CLEANUP
            ]);
        });

        it('should add `ConfigTransform.CLEANUP` to the end', () => {
            transform.set('./test/fixtures/webpack.1.config.js', transform1)
                .set('./test/fixtures/webpack.1.config.js', transform1)
                .set('./test/fixtures/webpack.1.config.js', transform1);

            expect(last(transform.get('./test/fixtures/webpack.1.config.js'))).toEqual(ConfigTransform.CLEANUP);
        });
    });

    describe('#setAll()', () => {
        it('should add `String`', () => {
            transform.setAll('./test/fixtures/webpack.1.config.js');

            expect(transform.get('./test/fixtures/webpack.1.config.js')).toEqual([
                ConfigTransform.DEFAULT,
                ConfigTransform.CLEANUP
            ]);
        });

        it('should add `Object<String,Function>`', () => {
            transform.setAll({
                './test/fixtures/webpack.1.config.js': transform1
            }, {
                './test/fixtures/webpack.2.config.js': transform2
            });

            expect(transform.get('./test/fixtures/webpack.1.config.js')).toEqual([
                transform1,
                ConfigTransform.CLEANUP
            ]);
            expect(transform.get('./test/fixtures/webpack.2.config.js')).toEqual([
                transform2,
                ConfigTransform.CLEANUP
            ]);
        });

        it('should add `Object<String,Function[]>`', () => {
            transform.setAll({
                './test/fixtures/webpack.1.config.js': [
                    transform1,
                    transform2
                ]
            }, {
                './test/fixtures/webpack.1.config.js': [
                    transform1,
                    transform2
                ]
            });

            expect(transform.get('./test/fixtures/webpack.1.config.js')).toEqual([
                transform1,
                transform2,
                transform1,
                transform2,
                ConfigTransform.CLEANUP
            ]);
        });
    });
});
