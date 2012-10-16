angular.scenario.dsl('repeatingInput', function() {
  var chain = {};
  var supportInputEvent = 'oninput' in document.createElement('div');

  chain.enter = function(value, event) {
    return this.addFutureAction("input '" + this.name + "' enter '" + value + "'", function($window, $document, done) {
      var input = $window.$($document.elements('[ng-model="$1"]', this.name).filter(':input').get(this.idx));
      input.val(value);
      input.trigger(event || supportInputEvent && 'input' || 'change');
      done();
    });
  };

  return function(name, index) {
    this.name = name;
    this.idx = index;
    return chain;
  };
});