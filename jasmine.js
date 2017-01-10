import Jasmine from 'jasmine';
import {
    SpecReporter
} from 'jasmine-spec-reporter';

const jasmine = new Jasmine();

jasmine.env.clearReporters();
jasmine.addReporter(new SpecReporter({
    spec: {
        displayPending: true
    }
}));
jasmine.loadConfigFile('./jasmine.json');
jasmine.execute();
