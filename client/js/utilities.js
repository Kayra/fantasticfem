(function() {

    var femaleAppUtilities = angular.module('femaleApp.utilities', []);

    femaleAppUtilities.factory("FemaleUtility", function() {

        var utility = {};

        utility.formToFormData = function(formObject) {

            var femaleFormData = new FormData();

            for(var key in formObject) {
                if (formObject.hasOwnProperty(key)) {
                    femaleFormData.append([key], formObject[key]);
                }
            }

            return femaleFormData;

        }

        return utility;

    })

})();
