const coverage = !process.env.SKIP_COVERAGE || process.env.SKIP_COVERAGE.toLowerCase() !== 'true';

module.exports = {
    srcDir: './src',
    testSrcDir: './testSrc',
    licenseFile: './license.txt',
    buildDir: './out',
    buildSrcDir: './out/src',
    testRunDir: './out/testSrc',
    reportDir: './out/reports',
    coverage: false // todo, coverage not working with freeze and too f-ing slow otherwize
}