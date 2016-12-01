import yargs from 'yargs';

export default yargs.options({
    env: {
        type: 'string'
    }
}).argv;
