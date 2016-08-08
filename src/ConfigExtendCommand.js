import {
    isObject,
    isString
} from 'lodash';
import Config from './Config';
import ConfigCommand from './ConfigCommand';
import DEFAULT_TRANSFORM from './ConfigDefaultTransform';
import CLEANUP_TRANSFORM from './ConfigCleanupTransform';

/**
 * @typedef {Object<String,ConfigTransform[]>} ConfigExtendOptions
 */

/**
 * @typedef {String|Object<String,ConfigTransform>|ConfigExtendOptions} ConfigExtendPossibleOptions
 */

/**
 * @private
 * @type {WeakMap}
 */
const LOADER = new WeakMap();

/**
 * @private
 * @type {WeakMap}
 */
const FACTORY = new WeakMap();

/**
 * @class
 * @extends {ConfigCommand}
 */
class ConfigExtendCommand extends ConfigCommand {
    /**
     * @constructor
     * @param {ConfigOptionsResolver} optionsResolver
     * @param {ConfigLoader} loader
     * @param {ConfigFactory} factory
     */
    constructor(optionsResolver, loader, factory) {
        super(optionsResolver);

        LOADER.set(this, loader);
        FACTORY.set(this, factory);
    }

    /**
     * @readonly
     * @type {ConfigLoader}
     */
    get loader() {
        return LOADER.get(this);
    }

    /**
     * @readonly
     * @type {ConfigFactory}
     */
    get factory() {
        return FACTORY.get(this);
    }

    /**
     * @override
     */
    execute(config, options) {
        const normalizedOptions = ConfigExtendCommand.normalizeOptions(options);

        normalizedOptions.forEach(value => {
            const { filename, transforms } = this.optionsResolver.resolve(config, value);
            const pendingConfig = this.loader.loadConfig(filename);

            if (pendingConfig instanceof Config) {
                config.dependencyTree.children.push(pendingConfig.dependencyTree);

                let prevConfig = pendingConfig.clone();

                transforms.forEach(transform => {
                    const currConfig = transform.call(config, prevConfig);

                    if (!isObject(currConfig)) {
                        prevConfig = {};
                    } else {
                        prevConfig = currConfig;
                    }

                    if (!(prevConfig instanceof Config)) {
                        prevConfig = this.factory.createConfig({}).merge(prevConfig);
                    }
                });

                if (prevConfig instanceof Config) {
                    config.merge(prevConfig.toObject());
                }
            }
        });
    }

    /**
     * @param {ConfigExtendPossibleOptions} options
     * @returns {ConfigExtendOptions[]}
     */
    static normalizeOptions(options) {
        let normalizedOptions = [];

        if (isString(options)) {
            normalizedOptions = [{
                filename: options,
                transforms: [
                    DEFAULT_TRANSFORM,
                    CLEANUP_TRANSFORM
                ]
            }];
        } else if (isObject(options)) {
            for (const [filename, transform] of Object.entries(options)) {
                const transforms = Array.isArray(transform) ? transform : [transform];

                normalizedOptions.push({
                    filename,
                    transforms: [
                        ...transforms,
                        CLEANUP_TRANSFORM
                    ]
                });
            }
        }

        return normalizedOptions;
    }
}

export default ConfigExtendCommand;
