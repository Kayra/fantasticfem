(function(){

    var femaleAppServices = angular.module('femaleApp.services', []);

    var host_name = "http://127.0.0.1:8000/"

    femaleAppServices.factory("FemaleService", ['$http', function($http) {

        var female = {};

        female.getFemale = function() {

        };

        female.getRandomFemale = function() {
            return $http.get(host_name + 'females/get-random');
        };

        female.getFemaleList = function() {
            return $http.get(host_name + 'females/list');
        }

        female.createFemale = function(femaleJsonObject) {
            return $http.post(host_name + 'females/create', femaleJsonObject);
        };

        female.editFemale = function() {
            return $http.post(host_name + 'females/edit', femaleJsonObject);
        };

        female.deleteFemale = function() {

        };

        return female;

    }]);

})();
