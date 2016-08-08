import Config from '../src/Config';
import ConfigBuilder from '../src/ConfigBuilder';
import {
    Config as ConfigProxy,
    ConfigEnvironment,
    ConfigCache,
    ConfigPatternCache,
    ConfigStringResolver,
    ConfigPathResolver,
    ConfigLoader,
    ConfigFinder,
    ConfigFactory,
    ConfigBuilder as ConfigBuilderProxy,
    ConfigOptionsResolver,
    environment,
    cache,
    patternCache,
    stringResolver,
    pathResolver,
    loader,
    finder,
    factory,
    optionsResolver
} from '../src';

describe('Module', () => {
    const proxies = [
            [ConfigProxy, Config],
            [ConfigBuilderProxy, ConfigBuilder]
        ],
        classes = [
            [ConfigEnvironment, environment],
            [ConfigCache, cache],
            [ConfigPatternCache, patternCache],
            [ConfigStringResolver, stringResolver],
            [ConfigPathResolver, pathResolver],
            [ConfigLoader, loader],
            [ConfigFinder, finder],
            [ConfigFactory, factory],
            [ConfigOptionsResolver, optionsResolver]
        ];

    proxies.forEach(proxy => {
        it(`should export \`${proxy[1].name}\``, () => {
            const Proxy = proxy[0];

            expect(Proxy).toBeTruthy();
            expect(new Proxy()).toEqual(jasmine.any(proxy[1]));
        });
    });

    classes.forEach(cls => {
        it(`should export \`${cls[0].name}\``, () => {
            expect(cls[0]).toBeTruthy();
            expect(cls[1]).toEqual(jasmine.any(cls[0]));
        });
    });
});
