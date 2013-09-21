angular.module('braxis.ui.tabs', [])

        .directive('tabset', ['$compile', function ($compile) {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {},
                controller: ['$element', '$scope', function ($element, $scope) {
                    this.element = $element;
                    this.scope = $scope;

                    $scope.liClass = function (index) {
                        return $scope.active && $scope.active[index] ? 'active' : '';
                    };

                    $scope.clickTab = function (index) {
                        while ($scope.active.length <= index) {
                            $scope.active.push(false);
                        }
                        var length = $scope.active.length;
                        for (var i = 0; i < length; i++) {
                            $scope.active[i] = (i == index);
                        }
                    };
                }],
                template: '<div class="tab-wrapper">' +
                        '<ul class="nav nav-tabs headings" ng-transclude></ul>' +
                        '</div>',
                link: function (scope, element, attrs) {
                    var lis = element.find('.headings li');
                    scope.active = [];
                    if (lis.length == 0) {
                        scope.active.push(true);
                    } else {
                        var panes = element.find('.tab-content');
                        panes.each(function (i) {
                            var pane = angular.element(this);
                            if (i != 0) {
                                pane.addClass('hide-pane');
                            }
                        });
                        lis.each(function (i, li) {
                            var liEl = angular.element(li);
                            if (i == 0) {
                                liEl.addClass('active');
                            }
                            liEl.find('a').click(function () {
                                lis.each(function (iClicked) {
                                    var li = angular.element(this)
                                    if (i == iClicked) {
                                        li.addClass('active');
                                    } else {
                                        li.removeClass('active');
                                    }
                                });
                                panes.each(function (iClicked) {
                                    var pane = angular.element(this);
                                    if (i == iClicked) {
                                        pane.removeClass('hide-pane')
                                    } else {
                                        pane.addClass('hide-pane')
                                    }
                                });
                            });
                        });
                    }
                }

            }
        }])
        .directive('tab', [function () {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                require: '^tabset',
                template: '<li ng-class="liClass($index)"><a ng-transclude ng-click="clickTab($index)"></a></li>',
                link: function (scope, element, attrs, tabsetCtrl) {
                    scope.active = tabsetCtrl.scope.active;
                    scope.liClass = tabsetCtrl.scope.liClass;
                    scope.clickTab = tabsetCtrl.scope.clickTab;
                }

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
        .directive('content', ['$compile', function ($compile) {
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
                        var wrapper;
                        if (scope.$index === undefined) {
                            wrapper = angular.element($compile('<div class="tab-content"></div>')(scope));
                        } else {
                            wrapper = angular.element($compile('<div class="tab-content" ng-show="active[$index]"></div>')(scope));
                        }
                        wrapper.append(content);
                        tabsetCtrl.element.append(wrapper);
                    });
                }

            }
        }])