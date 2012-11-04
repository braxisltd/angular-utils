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


/**
 * Copied from angular-scenario.js so we can extend it.
 * TODO look into how we can mix this in so we don't have to repeat ourselves.
 */
angular.scenario.dsl('select', function () {
    var chain = {};

    chain.option = function (value) {
        return this.addFutureAction("select '" + this.name + "' option '" + value + "'", function ($window, $document, done) {
            var select = $document.elements('select[ng\\:model="$1"]', this.name);
            var option = select.find('option[value="' + value + '"]');
            if (option.length) {
                select.val(value);
            } else {
                option = select.find('option:contains("' + value + '")');
                if (option.length) {
                    select.val(option.val());
                }
            }
            select.trigger('change');
            done();
        });
    };

    chain.options = function () {
        var values = arguments;
        return this.addFutureAction("select '" + this.name + "' options '" + values + "'", function ($window, $document, done) {
            var select = $document.elements('select[multiple][ng\\:model="$1"]', this.name);
            select.val(values);
            select.trigger('change');
            done();
        });
    };

    /* Extension starts */
    chain.selectedOption = function () {
        return this.addFutureAction("selected option in '" + this.name + "'", function ($window, $document, done) {
            var select = $document.elements('select[ng\\:model="$1"]', this.name);
            done(null, select.find('option:selected').text());
        });
    };
    /* Extension end */

    return function (name) {
        this.name = name;
        return chain;
    };

});