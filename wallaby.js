export default wallaby => {
    return {
        files: [
            'src/**/*.js',
            'test/**/*.js',
            '!test/**/*.spec.js'
        ],
        tests: [
            'test/**/*.spec.js'
        ],
        testFramework: 'jasmine',
        env: {
            type: 'node'
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babelrc: true
            })
        }
    };
};
