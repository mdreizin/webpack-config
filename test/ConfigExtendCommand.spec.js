import {
    resolve
} from 'path';
import Config from '../src/Config';
import ConfigExtendCommand from '../src/ConfigExtendCommand';
import DEFAULT_TRANSFORM from '../src/ConfigDefaultTransform';
import CLEANUP_TRANSFORM from '../src/ConfigCleanupTransform';
import ConfigDependency from '../src/ConfigDependency';
import MockConfigContainer from './helpers/MockConfigContainer';

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
        config = container.resolve(Config);
        command = container.resolve(ConfigExtendCommand);
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
            const paths = [];

            command.execute(config, './test/fixtures/webpack.1.config.js');

            for (const {node} of config.dependencyTree) {
                paths.push(node.root.filename);
            }

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
                        tags: [
                            'custom-config1'
                        ]
                    };
                }
            });

            expect(config.toObject()).toEqual({
                tags: [
                    'custom-config1'
                ]
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
                            tags: [
                                'custom-config1'
                            ]
                        };
                    },
                    x => {
                        expect(x).toEqual(jasmine.any(Config));

                        return x.merge({
                            tags: [
                                'custom-config2'
                            ]
                        });
                    }
                ]
            });

            expect(config.toObject()).toEqual({
                tags: [
                    'custom-config1',
                    'custom-config2'
                ]
            });
        });
    });
});
