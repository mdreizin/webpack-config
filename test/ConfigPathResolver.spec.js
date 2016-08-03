import {
    resolve
} from 'path';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigPatternCache from '../src/ConfigPatternCache';

describe('ConfigPathResolver', () => {
    let environment,
        nameResolver,
        pathResolver,
        patternCache;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
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
