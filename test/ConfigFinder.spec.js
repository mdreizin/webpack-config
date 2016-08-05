import {
    resolve
} from 'path';
import ConfigFinder from '../src/ConfigFinder';
import MockConfigContainer from './helpers/MockConfigContainer';

describe('ConfigFinder', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {ConfigFinder}
         */
        finder;

    beforeEach(() => {
        finder = container.resolve(ConfigFinder);
    });

    describe('#findConfigs()', () => {
        it('should find configs using pattern `./test/fixtures/webpack.*.config.js`', () => {
            const configs = finder.findConfigs('./test/fixtures/webpack.*.config.js');

            expect(configs).toEqual(jasmine.any(Array));
            expect(configs.length).toEqual(6);
        });

        it('should find configs using pattern `./test/fixtures/webpack.1.config.js`', () => {
            const configs = finder.findConfigs('./test/fixtures/webpack.1.config.js');

            expect(configs).toEqual(jasmine.any(Array));
            expect(configs.length).toEqual(1);
        });

        it('should return `[]` when configs are not found', () => {
            const configs = finder.findConfigs('./webpack.config.js');

            expect(configs).toEqual([]);
        });
    });

    describe('#findClosestConfigs()', () => {
        it('should find closet configs using pattern `./test/fixtures/dir1/dir2/dir3/webpack.*.config.js`', () => {
            const configs = finder.findClosestConfigs('./test/fixtures/dir1/dir2/dir3/webpack.*.config.js');

            expect(configs).toEqual(jasmine.any(Array));
            expect(configs.length).toEqual(6);
        });

        it('should find closet configs using pattern `./test/fixtures/webpack.1.config.js`', () => {
            const configs = finder.findClosestConfigs('./test/fixtures/webpack.1.config.js');

            expect(configs).toEqual(jasmine.any(Array));
            expect(configs.length).toEqual(1);
            expect(configs[0]).toEqual(resolve('./test/fixtures/webpack.1.config.js'));
        });

        it('should return `[]` when closet configs are not found', () => {
            const configs = finder.findClosestConfigs('./webpack.config.js');

            expect(configs).toEqual([]);
        });
    });
});
