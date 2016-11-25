import {
    resolve
} from 'path';
import ConfigPathResolver from '../src/ConfigPathResolver';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigPathResolver', () => {
    const container = new MockConfigContainer();

    let pathResolver;

    beforeEach(() => {
        pathResolver = container.resolve(ConfigPathResolver);
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
