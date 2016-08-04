import {
    resolve
} from 'path';
import TestFactory from './helpers/TestFactory';

describe('ConfigLoader', () => {
    let loader;

    beforeEach(() => {
        loader = TestFactory.createConfigLoader();
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
