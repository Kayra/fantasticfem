(function(){

    var femaleAppServices = angular.module('femaleApp.services', []);

    var host_name = "http://127.0.0.1:8000/"

    femaleAppServices.factory("FemaleService", ['$http', function($http) {

        var female = {};

        var buildFemaleProperties = function(properties) {

            var femaleProperties = {};

            for(var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    femaleProperties[key] = properties[key];
                }
            }

            femaleProperties.previewImage = properties.profileImage;

            return femaleProperties;

        };

        var assignFemaleProperties = function(response) {
            female.femaleProperties = buildFemaleProperties(response);
        };

        female.getFemale = function(identifier) {
            return $http.get(host_name + 'females/get', {
                params: {
                    identifier: identifier,
                }
            }).success(assignFemaleProperties);
        };

        female.getRandomFemale = function() {
            return $http.get(host_name + 'females/get-random').success(assignFemaleProperties);
        };

        female.getFemaleList = function() {
            return $http.get(host_name + 'females/list');
        };

        female.createFemale = function(femaleObject) {
            return $http.post(host_name + 'females/create', femaleObject, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };

        female.editFemale = function(femaleObject) {
            return $http.put(host_name + 'females/edit', femaleObject, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };

        female.deleteFemale = function(id) {
            return $http.delete(host_name + 'females/delete', {
                params: {
                    id: id
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
