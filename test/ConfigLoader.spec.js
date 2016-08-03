import {
    resolve
} from 'path';
import ConfigLoader from '../src/ConfigLoader';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigCache from '../src/ConfigCache';
import ConfigPatternCache from '../src/ConfigPatternCache';

describe('ConfigLoader', () => {
    let environment,
        nameResolver,
        pathResolver,
        cache,
        loader,
        patternCache;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
        cache = new ConfigCache(environment);
        loader = new ConfigLoader(pathResolver, cache);
    });

    describe('#loadConfig()', () => {
        it('should load config', () => {
            const config = loader.loadConfig('./test/fixtures/webpack.1.config.js');

            expect(config).toEqual(jasmine.any(Object));
        });

        it('should set `filename` when absent', () => {
            const config = loader.loadConfig('./test/fixtures/webpack.6.config.js');

            expect(config.filename).toEqual(resolve('./test/fixtures/webpack.6.config.js'));
        });

        it('should throw exception when config is not found', () => {
            expect(() => {
                loader.loadConfig('./test/fixtures/webpack.not-found.config.js');
            }).toThrowError(Error);
        });
    });
});
