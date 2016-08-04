import {
    resolve
} from 'path';
import TestFactory from './helpers/TestFactory';

describe('ConfigCache', () => {
    const FILENAME = resolve('./test/fixtures/webpack.1.config.js');

    let cache;

    beforeEach(() => {
        cache = TestFactory.createConfigCache();
    });

    describe('#get()', () => {
        it('should return same configs when `persistent` is `true`', () => {
            const config1 = cache.get(FILENAME),
                config2 = cache.get(FILENAME);

            cache.persistent = true;

            expect(config1).toBe(config2);
        });

        it('should return different configs when `persistent` is `false`', () => {
            const config1 = cache.get(FILENAME);

            cache.persistent = false;

            const config2 = cache.get(FILENAME);

            expect(config1).not.toBe(config2);
        });
    });
});
