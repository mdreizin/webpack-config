import {
    resolve
} from 'path';
import ConfigEnvironment from '../src/ConfigEnvironment';
import ConfigCache from '../src/ConfigCache';

describe('ConfigCache', () => {
    const FILENAME = resolve('./test/fixtures/webpack.1.config.js');

    let environment,
        cache;

    beforeEach(() => {
        environment = new ConfigEnvironment();
        cache = new ConfigCache(environment);
    });

    describe('.INSTANCE', () => {
        it('should return instance of `ConfigEnvironment`', () => {
            expect(ConfigCache.INSTANCE).toEqual(jasmine.any(ConfigCache));
        });
    });

    describe('#get()', () => {
        it('should return same configs when `persistent` is `true`', () => {
            let config1 = cache.get(FILENAME),
                config2 = cache.get(FILENAME);

            cache.persistent = true;

            expect(config1).toBe(config2);
        });

        it('should return different configs when `persistent` is `false`', () => {
            let config1 = cache.get(FILENAME);

            cache.persistent = false;

            let config2 = cache.get(FILENAME);

            expect(config1).not.toBe(config2);
        });
    });
});
