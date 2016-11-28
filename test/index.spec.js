import Config from '../src/Config';
import {
    Config as ConfigProxy,
    ConfigEnvironment,
    ConfigCache,
    ConfigPatternCache,
    ConfigStringResolver,
    ConfigPathResolver,
    ConfigLoader,
    ConfigFactory,
    ConfigOptionsResolver,
    ConfigCommandFactory,
    cache,
    environment,
    patternCache,
    stringResolver,
    pathResolver,
    loader,
    factory,
    optionsResolver,
    commandFactory
} from '../src';

describe('Module', () => {
    const proxies = new Map(),
        classes = new Map();

    proxies.set(ConfigProxy, Config);

    classes.set(ConfigEnvironment, environment)
        .set(ConfigCache, cache)
        .set(ConfigPatternCache, patternCache)
        .set(ConfigStringResolver, stringResolver)
        .set(ConfigPathResolver, pathResolver)
        .set(ConfigLoader, loader)
        .set(ConfigFactory, factory)
        .set(ConfigOptionsResolver, optionsResolver)
        .set(ConfigCommandFactory, commandFactory);

    for (const [ProxyClass, Class] of proxies) {
        it(`should export \`${Class.name}\``, () => {
            expect(ProxyClass).toBeTruthy();
            expect(new ProxyClass()).toEqual(jasmine.any(Class));
        });
    }

    for (const [Class, instance] of classes) {
        it(`should export \`${Class.name}\``, () => {
            expect(Class).toBeTruthy();
            expect(instance).toEqual(jasmine.any(Class));
        });
    }
});
