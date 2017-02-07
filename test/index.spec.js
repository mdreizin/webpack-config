import Config from '../src/Config';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigCache from '../src/ConfigCache';
import ConfigPatternCache from '../src/ConfigPatternCache';
import {
    Config as ConfigProxy,
    environment,
    cache,
    patternCache,
    FILENAME
} from '../src';

describe('Module', () => {
    describe('FILENAME', () => {
        it('should be equal to `webpack.config.js`', () => {
            expect(FILENAME).toEqual('webpack.config.js');
        });
    });

    describe('Config', () => {
        it('should be defined', () => {
            expect(ConfigProxy).toEqual(jasmine.any(Function));
        });
    });

    describe('config', () => {
        it('should be instance of `Config`', () => {
            expect(ConfigProxy).toBeTruthy();
            expect(new ConfigProxy()).toEqual(jasmine.any(Config));
        });
    });

    describe('environment', () => {
        it('should be instance of `ConfigEnvironment`', () => {
            expect(environment).toEqual(jasmine.any(ConfigEnvironment));
        });
    });

    describe('cache', () => {
        it('should be instance of `ConfigCache`', () => {
            expect(cache).toEqual(jasmine.any(ConfigCache));
        });
    });

    describe('patternCache', () => {
        it('should be instance of `ConfigPatternCache`', () => {
            expect(patternCache).toEqual(jasmine.any(ConfigPatternCache));
        });
    });
});
