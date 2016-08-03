import Config from '../src/Config';
import ConfigBuilder from '../src/ConfigBuilder';
import {
    Config as ConfigProxy,
    ConfigEnvironment,
    ConfigCache,
    ConfigPatternCache,
    ConfigNameResolver,
    ConfigPathResolver,
    ConfigLoader,
    ConfigFinder,
    ConfigFactory,
    ConfigBuilder as ConfigBuilderProxy,
    environment,
    cache,
    patternCache,
    nameResolver,
    pathResolver,
    loader,
    finder,
    factory
} from '../src';

describe('Module', () => {
    it('should export `Config`', () => {
        expect(ConfigProxy).toBeTruthy();
        expect(new ConfigProxy()).toEqual(jasmine.any(Config));
    });

    it('should export `ConfigEnvironment`', () => {
        expect(ConfigEnvironment).toBeTruthy();
        expect(environment).toEqual(jasmine.any(ConfigEnvironment));
    });

    it('should export `ConfigCache`', () => {
        expect(ConfigCache).toBeTruthy();
        expect(cache).toEqual(jasmine.any(ConfigCache));
    });

    it('should export `ConfigPatternCache`', () => {
        expect(ConfigPatternCache).toBeTruthy();
        expect(patternCache).toEqual(jasmine.any(ConfigPatternCache));
    });

    it('should export `ConfigNameResolver`', () => {
        expect(ConfigNameResolver).toBeTruthy();
        expect(nameResolver).toEqual(jasmine.any(ConfigNameResolver));
    });

    it('should export `ConfigPathResolver`', () => {
        expect(ConfigPathResolver).toBeTruthy();
        expect(pathResolver).toEqual(jasmine.any(ConfigPathResolver));
    });

    it('should export `ConfigLoader`', () => {
        expect(ConfigLoader).toBeTruthy();
        expect(loader).toEqual(jasmine.any(ConfigLoader));
    });

    it('should export `ConfigFinder`', () => {
        expect(ConfigFinder).toBeTruthy();
        expect(finder).toEqual(jasmine.any(ConfigFinder));
    });

    it('should export `ConfigFactory`', () => {
        expect(ConfigFactory).toBeTruthy();
        expect(factory).toEqual(jasmine.any(ConfigFactory));
    });

    it('should export `ProxyConfigBuilder`', () => {
        expect(ConfigBuilderProxy).toBeTruthy();
        expect(new ConfigBuilderProxy()).toEqual(jasmine.any(ConfigBuilder));
    });
});
