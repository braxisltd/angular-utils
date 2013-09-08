angular.module('braxis.ui.tabs', [])

        .directive('tabset', [function () {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {},
                controller: ['$element', function ($element) {
                    this.element = $element;
                }],
                template: '<div class="tab-wrapper">' +
                        '<ul class="nav nav-tabs headings" ng-transclude></ul>' +
                        '</div>',
                link: function (scope, element, attrs) {
                    var headings = element.find('ul.headings li');
                    var panes = element.find('div.tab-content');

                    scope.active = [];
                    angular.forEach(headings, function (heading, index) {
                        scope.active.push(false);
                        angular.element(heading).find('a').click(function () {
                            var tabCount = scope.active.length;
                            scope.$apply(function () {
                                for (var i = 0; i < tabCount; i++) {
                                    scope.active[i] = (i == index);
                                }
                            })
                        });
                    });
                    scope.active[0] = true;
                    scope.$watch(
                            'active',
                            function (actives) {
                                angular.forEach(actives, function (active, index) {
                                    var li = angular.element(headings[index]);
                                    var pane = angular.element(panes[index]);
                                    if (active) {
                                        li.addClass('active');
                                        pane.show();
                                    } else {
                                        li.removeClass('active');
                                        pane.hide();
                                    }
                                });
                            },
                            true
                    );
                }

            }
        }])
        .directive('tab', [function () {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                template: '<li><a ng-transclude></a></li>'
            }
        }])
        .directive('heading', [function () {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                template: '<span ng-transclude></span>'
            }
        }])
        .directive('content', [function () {
            return {
                restrict: 'EA',
                replace: true,
                require: '^tabset',
                transclude: true,
                controller: ['$scope', '$transclude', function ($scope, $transclude) {
                    $scope.transcludeFn = $transclude
                }],
                link: function (scope, element, attrs, tabsetCtrl) {
                    scope.transcludeFn(function (content) {
                        var wrapper = angular.element('<div class="tab-content"></div>');
                        wrapper.append(content);
                        tabsetCtrl.element.append(wrapper);
                    });
                }

            }
        }])