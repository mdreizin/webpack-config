import {
    resolve
} from 'path';
import ConfigLoader from '../src/ConfigLoader';
import MockConfigContainer from './helpers/MockConfigContainer';

describe('ConfigLoader', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {ConfigLoader}
         */
        loader;

    beforeEach(() => {
        loader = container.resolve(ConfigLoader);
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
