module.exports = function (config) {
    config.set({

        basePath: '../../',

        files: [
            'app/lib/jquery-2.0.3.min.js',
            'app/lib/angular-1.2.0.rc2/angular.js',
            'app/lib/angular-1.2.0.rc2/angular-*.js',
            'app/js/tabs.js',
            'test/e2e-matchers/**/*.js',
            'test/e2e/**/*.js'
        ],

        autoWatch: true,

        singleRun: false,

        browsers: ['Chrome'],

        frameworks: ['ng-scenario'],

        proxies: {
            '/': 'http://localhost:8000/'
        },

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'
        ],

        junitReporter: {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }

    })
}