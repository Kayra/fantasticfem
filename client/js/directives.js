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

    femaleAppDirectives.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.on('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    })
                });

            }
        };
    }]);

    femaleAppDirectives.directive('imagePreview', function() {
        return {
            restrict: 'A',
            scope: {
                imagePreview: '='
            },
            link: function(scope, element, attrs) {

                var fileReader = new FileReader();

                fileReader.onload = function(event) {
    
                    scope.imagePreview = event.target.result;
                    scope.$apply();
                };

                element.on('change', function() {
                    fileReader.readAsDataURL(element[0].files[0]);
                });

            }
        };
    });

})();
