import argvParser from 'yargs-parser';

/**
 * @private
 * @type {Object}
 */
const argv = argvParser(process.argv.slice(2));

export default argv;
