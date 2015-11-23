(function(){

    var femaleAppServices = angular.module('femaleApp.services', []);

    var host_name = "http://127.0.0.1:8000/"

    femaleAppServices.factory("FemaleService", ['$http', function($http) {

        var female = {};

        female.getFemale = function() {

        };

        female.getRandomFemale = function() {

        };

        female.createFemale = function(femaleJsonObject) {

            return $http.post(host_name + 'females/create', femaleJsonObject);

        };

        female.editFemale = function() {

        };

        female.deleteFemale = function() {

        };

        return female;

    }]);

})();
