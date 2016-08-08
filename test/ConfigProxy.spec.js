import ConfigDependency from '../src/ConfigDependency';
import ConfigProxy from '../src';

describe('ConfigProxy', () => {
    let config;

    beforeEach(() => {
        config = new ConfigProxy();
    });

    describe('#merge()', () => {
        it('should do merge successfully', () => {
            config.merge({
                foo: 'foo1',
                bar: 'bar1'
            });

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: 'bar1'
            });
        });
    });

    describe('#defaults()', () => {
        it('should do merge successfully', () => {
            config.merge({
                foo: 'foo1',
                bar: 'bar1'
            }).defaults({
                bar: 'bar2'
            });

            expect(config.toObject()).toEqual({
                foo: 'foo1',
                bar: 'bar1'
            });
        });
    });

    describe('#extend()', () => {
        it('should do extend successfully', () => {
            const paths = [];

            config.extend('./test/fixtures/webpack.1.config.js');

            for (const {node} of config.dependencyTree) {
                paths.push(node.root.filename);
            }

            expect(config.dependencyTree).toEqual(jasmine.any(ConfigDependency));
            expect(paths.length).toEqual(5);
        });
    });
});
