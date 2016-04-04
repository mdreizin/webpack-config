import {
    resolve
} from 'path';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigPatternCache from '../src/ConfigPatternCache';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';

describe('ConfigNameResolver', () => {
    let environment,
        patternCache,
        nameResolver,
        pathResolver;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
    });

    describe('.INSTANCE', () => {
        it('should return instance of `ConfigPathResolver`', () => {
            expect(ConfigPathResolver.INSTANCE).toEqual(jasmine.any(ConfigPathResolver));
        });
    });

    describe('#resolvePath()', () => {
        it('should resolve `filename` via `path.resolve()`', () => {
            let filename = pathResolver.resolvePath('webpack.config.js');

            expect(filename).toEqual(resolve('webpack.config.js'));
        });

        it('should resolve `filename` via `require.resolve()`', () => {
            let filename = pathResolver.resolvePath('lodash');

            expect(filename).toEqual(require.resolve('lodash'));
        });
    });
});
