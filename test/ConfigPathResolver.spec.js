import {
    resolve
} from 'path';
import TestFactory from './helpers/TestFactory';

describe('ConfigPathResolver', () => {
    let pathResolver;

    beforeEach(() => {
        pathResolver = TestFactory.createConfigPathResolver();
    });

    describe('#resolve()', () => {
        it('should resolve as `path.resolve()`', () => {
            const filename = pathResolver.resolve('webpack.config.js');

            expect(filename).toEqual(resolve('webpack.config.js'));
        });

        it('should resolve as `require.resolve()`', () => {
            const filename = pathResolver.resolve('lodash');

            expect(filename).toEqual(require.resolve('lodash'));
        });
    });
});
