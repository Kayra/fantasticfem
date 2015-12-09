(function() {

    var femaleAppUtilities = angular.module('femaleApp.utilities', []);

    femaleAppUtilities.factory("FemaleUtility", function() {

        var utility = {};

        utility.formToJsonObject = function(formObject) {

            var femaleObject = {};

            for(var key in formObject) {
                if (formObject.hasOwnProperty(key)) {
                    femaleObject[key] = formObject[key];
                }
            }

            return angular.toJson(femaleObject);

        }

        utility.createFullName = function(firstName, lastName) {
            return firstName + '_' + lastName;
        }

        return utility;

    })

})();
