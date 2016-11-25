import {
    resolve
} from 'path';
import ConfigCache from '../src/ConfigCache';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigCache', () => {
    const FILENAME = resolve('./test/fixtures/webpack.1.config.js'),
        container = new MockConfigContainer();

    let cache;

    beforeEach(() => {
        cache = container.resolve(ConfigCache);

        cache.persistent = true;
    });

    describe('#get()', () => {
        it('should return same configs when `persistent` is `true`', () => {
            const config1 = cache.get(FILENAME),
                config2 = cache.get(FILENAME);

            expect(config1).toBe(config2);
        });

        it('should return different configs when `persistent` is `false`', () => {
            const config1 = cache.get(FILENAME);

            cache.persistent = false;

            const config2 = cache.get(FILENAME);

            expect(config1).not.toBe(config2);
        });

        it('should resolve `__esModule`', () => {
            cache.set('./test/fixtures/webpack.6.config.js', {
                __esModule: true,
                'default': {}
            });

            const config = cache.get('./test/fixtures/webpack.6.config.js');

            expect(config).toBeTruthy();
        });
    });
});
