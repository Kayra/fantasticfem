(function() {


    var femaleAppUtilities = angular.module('femaleApp.utilities', []);

    femaleAppUtilities.factory("FemaleUtility", function() {

        var utility = {};

        utility.getFemaleNameJson = function(url) {

            var fullNameObject = {};

            var fullNameArray = url.split('/')[2].split('_');
            fullNameObject.firstName = fullNameArray[0];
            fullNameObject.lastName = fullNameArray[1];

            var fullNameJson = angular.toJson(fullNameObject);

            return fullNameJson;

        }

        return utility;

    })

})();
