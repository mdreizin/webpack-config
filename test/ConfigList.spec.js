import ConfigList from '../src/ConfigList';

describe('ConfigList', () => {
    let configList;

    beforeEach(() => {
        configList = new ConfigList();
    });

    it('should be instance of `Array<Config>`', () => {
        expect(configList).toEqual(jasmine.any(Array));
        expect(configList).toEqual(jasmine.any(ConfigList));
    });
});
