import {
    resolve
} from 'path';
import Config from '../src/Config';
import ConfigLoader from '../src/ConfigLoader';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigPatternCache from '../src/ConfigPatternCache';
import ConfigNameResolver from '../src/ConfigNameResolver';
import ConfigPathResolver from '../src/ConfigPathResolver';
import ConfigCache from '../src/ConfigCache';
import ConfigFinder from '../src/ConfigFinder';

describe('ConfigFinder', () => {
    let environment,
        patternCache,
        nameResolver,
        pathResolver,
        cache,
        loader,
        finder;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        patternCache = new ConfigPatternCache();
        nameResolver = new ConfigNameResolver(environment, patternCache);
        pathResolver = new ConfigPathResolver(nameResolver);
        cache = new ConfigCache(environment);
        loader = new ConfigLoader(pathResolver, cache);
        finder = new ConfigFinder(loader, pathResolver);
    });

    describe('.INSTANCE', () => {
        it('should return instance of `ConfigFinder`', () => {
            expect(ConfigFinder.INSTANCE).toEqual(jasmine.any(ConfigFinder));
        });
    });

    describe('#findClosestConfig()', () => {
        it('should find config closet config', () => {
            let config = finder.findClosestConfig('./test/fixtures/dir1/dir2/dir3/webpack.1.config.js');

            expect(config).toEqual(jasmine.any(Config));
            expect(config.toObject()).toEqual({
                filename: resolve('./test/fixtures/webpack.1.config.js'),
                tags: [
                    'config1',
                    'config2',
                    'config3',
                    'config5',
                    'config4'
                ]
            });
        });

        it('should return `null` when closet config is not found', () => {
            let config = finder.findClosestConfig('./webpack.config.js');

            expect(config).toEqual(null);
        });
    });
});
