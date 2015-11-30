(function(){

    var femaleAppServices = angular.module('femaleApp.services', []);

    var host_name = "http://127.0.0.1:8000/"

    femaleAppServices.factory("FemaleService", ['$http', function($http) {

        var female = {};

        female.getFemale = function(firstName, lastName) {
            return $http.get(host_name + 'females/get', {
                params: {
                    firstName: firstName,
                    lastName: lastName
                }
            });
        };

        female.getRandomFemale = function() {
            return $http.get(host_name + 'females/get-random');
        };

        female.getFemaleList = function() {
            return $http.get(host_name + 'females/list');
        };

        female.createFemale = function(femaleJsonObject) {
            return $http.post(host_name + 'females/create', femaleJsonObject);
        };

        female.editFemale = function(femaleJsonObject) {
            return $http.put(host_name + 'females/edit', femaleJsonObject);
        };

        female.deleteFemale = function(firstName, lastName) {
            return $http.delete(host_name + 'females/delete', {
                params: {
                    firstName: firstName,
                    lastName: lastName
                }
            });
        };

        return female;

    }]);

    femaleAppServices.factory("SharedProperties", function() {

        var property = {};

        var value;

        property.getProperty = function() {
            return value;
        };

        property.setProperty = function(newValue) {
            value = newValue;
        };

        return property;

    });

})();
