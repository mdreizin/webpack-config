import Config from '../src/Config';
import ConfigDependency from '../src/ConfigDependency';
import ConfigDependencyIterator from '../src/ConfigDependencyIterator';
import MockConfigContainer from './MockConfigContainer';

describe('ConfigDependencyIterator', () => {
    const container = new MockConfigContainer();

    let dependencyTree;

    const generateConfig = filename => container.resolve(Config).merge({ filename });

    beforeEach(() => {
        dependencyTree = new ConfigDependency(generateConfig('./test/fixtures/webpack.1.config.js'), [
            new ConfigDependency(generateConfig('./test/fixtures/webpack.2.config.js')),
            new ConfigDependency(generateConfig('./test/fixtures/webpack.3.config.js')),
            new ConfigDependency(generateConfig('./test/fixtures/webpack.4.config.js'), [
                new ConfigDependency(generateConfig('./test/fixtures/webpack.5.config.js'))
            ])
        ]);
    });

    describe('#next()', () => {
        it('should go through `dependencyTree` recursively', () => {
            const nodes = [],
                iterator = new ConfigDependencyIterator(dependencyTree);

            for (const {node} of iterator) {
                nodes.push(node);
            }

            expect(nodes.length).toEqual(4);
        });
    });
});
