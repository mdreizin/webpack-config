import Jasmine from 'jasmine';
import SpecReporter from 'jasmine-spec-reporter';

const JASMINE_CONFIG_PATH = './jasmine.json';

let jasmine = new Jasmine();

jasmine.configureDefaultReporter({
    print: () => {}
});
jasmine.addReporter(new SpecReporter());
jasmine.loadConfigFile(JASMINE_CONFIG_PATH);
jasmine.execute();
