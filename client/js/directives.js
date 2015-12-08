(function(){

    var femaleAppDirectives = angular.module('femaleApp.directives', []);

    femaleAppDirectives.directive('ngFocus', [function() {

        var focusClass = "ng-focused";

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function(evt) {
                    element.addClass(focusClass);
                    scope.$apply(function() {ctrl.$focused = true;});
                }).bind('blur', function(evt) {
                    element.removeClass(focusClass);
                    scope.$apply(function() {ctrl.$focused = false;});
                });
            }
        }

    }]);

    femaleAppDirectives.directive('errorMessage', function() {
        return {
            restrict: 'E',
            scope: {
                data: '=message'
            },
            controller: function($scope) {
                console.log($scope.data);
                console.log('hit');
            }
        };
    });

})();
