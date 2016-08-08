import {
    resolve
} from 'path';
import Config from '../src/Config';
import ConfigExtendCommand from '../src/ConfigExtendCommand';
import DEFAULT_TRANSFORM from '../src/ConfigDefaultTransform';
import CLEANUP_TRANSFORM from '../src/ConfigCleanupTransform';
import ConfigDependency from '../src/ConfigDependency';
import MockConfigContainer from './helpers/MockConfigContainer';
import getConfigDependencyTree from './helpers/getConfigDependencyTree';
import getConfigCommand from './helpers/getConfigCommand';

describe('ConfigExtendCommand', () => {
    let container = new MockConfigContainer(),
        /**
         * @type {Config}
         */
        config,
        /**
         * @type {ConfigExtendCommand}
         */
        command,
        customTransform = () => {};

    beforeEach(() => {
        [config, command] = getConfigCommand(container, ConfigExtendCommand);
    });

    describe('.normalizeOptions()', () => {
        it('should normalize `String`', () => {
            const options = ConfigExtendCommand.normalizeOptions('./test/fixtures/webpack.1.config.js');

            expect(options).toEqual([{
                filename: './test/fixtures/webpack.1.config.js',
                transforms: [
                    DEFAULT_TRANSFORM,
                    CLEANUP_TRANSFORM
                ]
            }]);
        });

        it('should normalize `Object<String,Function>`', () => {
            const options = ConfigExtendCommand.normalizeOptions({
                './test/fixtures/webpack.1.config.js': customTransform,
                './test/fixtures/webpack.2.config.js': customTransform
            });

            expect(options).toEqual([{
                filename: './test/fixtures/webpack.1.config.js',
                transforms: [
                    customTransform,
                    CLEANUP_TRANSFORM
                ]
            }, {
                filename: './test/fixtures/webpack.2.config.js',
                transforms: [
                    customTransform,
                    CLEANUP_TRANSFORM
                ]
            }]);
        });

        it('should normalize `Object<String,Function[]>`', () => {
            const options = ConfigExtendCommand.normalizeOptions({
                './test/fixtures/webpack.1.config.js': [customTransform, customTransform],
                './test/fixtures/webpack.2.config.js': [customTransform]
            });

            expect(options).toEqual([{
                filename: './test/fixtures/webpack.1.config.js',
                transforms: [
                    customTransform,
                    customTransform,
                    CLEANUP_TRANSFORM
                ]
            }, {
                filename: './test/fixtures/webpack.2.config.js',
                transforms: [
                    customTransform,
                    CLEANUP_TRANSFORM
                ]
            }]);
        });
    });

    describe('#execute()', () => {
        it('should add `dependencyTree` property', () => {
            command.execute(config, './test/fixtures/webpack.1.config.js');

            const paths = getConfigDependencyTree(config);

            expect(config.dependencyTree).toEqual(jasmine.any(ConfigDependency));
            expect(paths).toEqual([
                resolve('./test/fixtures/webpack.1.config.js'),
                resolve('./test/fixtures/webpack.2.config.js'),
                resolve('./test/fixtures/webpack.3.config.js'),
                resolve('./test/fixtures/webpack.5.config.js'),
                resolve('./test/fixtures/webpack.4.config.js')
            ]);
        });

        it('should execute successfully using `String`', () => {
            command.execute(config, './test/fixtures/webpack.1.config.js');

            expect(config.toObject()).toEqual({
                tags: [
                    'config1',
                    'config2',
                    'config3',
                    'config5',
                    'config4'
                ]
            });
        });

        it('should execute successfully using `Object<String,Function>`', () => {
            config.extend({
                './test/fixtures/webpack.1.config.js': x => {
                    expect(x).toEqual(jasmine.any(Config));

                    return {
                        foo: 'foo1'
                    };
                }
            });

            expect(config.toObject()).toEqual({
                foo: 'foo1'
            });
        });

        it('should execute successfully using `Object<String,Function[]>`', () => {
            config.extend({
                './test/fixtures/webpack.1.config.js': [
                    x => {
                        expect(x).toEqual(jasmine.any(Config));
                    },
                    x => {
                        expect(x).toEqual(jasmine.any(Config));

                        return {
                            foo: 'foo1'
                        };
                    },
                    x => {
                        expect(x).toEqual(jasmine.any(Config));

                        return x.merge({
                            bar: 'bar1'
                        });
                    }
                ]
            });

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: 'bar1'
            });
        });
    });
});
