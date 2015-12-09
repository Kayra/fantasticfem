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
                errorType: '='
            },
            controller: function($scope) {
                $scope.$watch('errorType', function(errorType){
                    if (errorType == 'server') {
                        $scope.message = "Sorry, the service is currently unavailable. Please try again later."
                    }
                });

            },
            template: "<p>{{message}}</p>"
        };
    });

})();
