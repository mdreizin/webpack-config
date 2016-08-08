import {
    Container,
    Transient
} from 'constitute';
import Config from './Config';
import ConfigCache from './ConfigCache';
import ConfigEnvironment from './ConfigEnvironment';
import ConfigPatternCache from './ConfigPatternCache';
import ConfigNameResolver from './ConfigNameResolver';
import ConfigPathResolver from './ConfigPathResolver';
import ConfigLoader from './ConfigLoader';
import ConfigFinder from './ConfigFinder';
import ConfigFactory from './ConfigFactory';
import ConfigBuilder from './ConfigBuilder';

/**
 * @param {*} Class
 * @return {*}
 */
Container.prototype.proxyClass = function(Class) {
    return () => this.constitute(Class);
};

/**
 * @private
 * @type {Container}
 */
const container = new Container();

container.bindValue(ConfigEnvironment, new ConfigEnvironment(Object.entries(process.env)));
container.bindClass(ConfigCache, ConfigCache, [
    ConfigEnvironment
]);
container.bindValue(ConfigPatternCache, new ConfigPatternCache());
container.bindClass(ConfigNameResolver, ConfigNameResolver, [
    ConfigEnvironment,
    ConfigPatternCache
]);
container.bindClass(ConfigPathResolver, ConfigPathResolver, [
    ConfigNameResolver
]);
container.bindClass(ConfigLoader, ConfigLoader, [
    ConfigPathResolver,
    ConfigCache
]);
container.bindClass(ConfigFinder, ConfigFinder, [
    ConfigPathResolver
]);
container.bindClass(ConfigFactory, ConfigFactory, [
    ConfigLoader
]);
container.bindClass(Config, Config, Transient.with([
    ConfigLoader
]));
container.bindClass(ConfigBuilder, ConfigBuilder, Transient.with([
    ConfigFactory
]));

export default container;
