basePath = '../../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/lib/angular-1.2.0.rc2/angular.js',
    'app/lib/angular-1.2.0.rc2/angular-*.js',
    'js-test/lib/angular/angular-mocks.js',
    'app/js/**/*.js',
    'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
