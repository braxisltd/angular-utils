angular.scenario.matcher('toContain', function (expected) {
    return this.actual.indexOf(expected) != -1;
});