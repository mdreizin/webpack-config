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
    environment,
    cache,
    patternCache,
    stringResolver,
    pathResolver,
    loader,
    factory,
    optionsResolver
} from '../src';

describe('Module', () => {
    const proxies = [
            [ConfigProxy, Config]
        ],
        classes = [
            [ConfigEnvironment, environment],
            [ConfigCache, cache],
            [ConfigPatternCache, patternCache],
            [ConfigStringResolver, stringResolver],
            [ConfigPathResolver, pathResolver],
            [ConfigLoader, loader],
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
