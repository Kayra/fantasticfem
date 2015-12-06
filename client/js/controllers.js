(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale().then(function(response) {
                vm.female = FemaleService.properties;
            }, function() {
                throw new Error('Something went wrong.');
            });
        };

        vm.setId = function(id) {
            SharedProperties.setProperty(id);
        };

        vm.getRandomFemaleService();

    }])


    .controller('FemaleDetailController', ['FemaleService', 'SharedProperties', '$location', function(FemaleService, SharedProperties, $location) {

        var vm = this;

        vm.getFemaleName = function(url) {

            var fullNameObject = {};

            var fullNameArray = url.split('/')[2].split('_');
            fullNameObject.firstName = fullNameArray[0];
            fullNameObject.lastName = fullNameArray[1];

            return fullNameObject;

        }

        vm.getFemaleService = function(id) {
            FemaleService.getFemale(id).then(function(response) {
                vm.female = FemaleService.properties;
            }, function() {
                throw new Error('Something went wrong.');
            });
        };

        vm.setId = function(id) {
            SharedProperties.setProperty(id);
        };

        vm.getId = function() {
            return SharedProperties.getProperty();
        };

        var id = vm.getId();

        if (id) {
            vm.getFemaleService(id);
        } else {
            var fullNameArray = vm.getFemaleName($location.url());
            var fullNameJson = angular.toJson(fullNameArray);
            vm.getFemaleService(fullNameJson);
        }

    }])


    .controller('FemaleListController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getFemaleListService = function() {
            FemaleService.getFemaleList().then(function(response) {
                console.log(response.data);
                vm.females = response.data;
            });
        };

        vm.setId = function(id) {
            SharedProperties.setProperty(id);
        };

        vm.getFemaleListService();

    }])


    .controller('FemaleCreateController', ['FemaleService', '$state', function(FemaleService, $state) {

        var vm = this;

        vm.createFemaleService = function(femaleJsonObject) {
            FemaleService.createFemale(femaleJsonObject).then(function(response){
                console.log(response);
            });
        };

        vm.submit = function() {

            var femaleObject = {};

            femaleObject.firstName = vm.firstName;
            femaleObject.lastName = vm.lastName;
            femaleObject.dateOfBirth = vm.dateOfBirth;
            femaleObject.zipCode = vm.zipCode;
            femaleObject.bio = vm.bio;
            femaleObject.fantasticBio = vm.fantasticBio;

            var femaleJsonObject = angular.toJson(femaleObject);

            vm.createFemaleService(femaleJsonObject);

            var fullName = vm.firstName + "_" + vm.lastName;

            $state.go('female_detail', {female: fullName});

        }

    }])


    .controller('FemaleEditController', ['FemaleService', 'SharedProperties', '$location', '$state', function(FemaleService, SharedProperties, $location, $state) {

        var vm = this;

        vm.getFemaleService = function(id) {
            FemaleService.getFemale(id).then(function(response) {
                vm.female = FemaleService.properties;
            }, function() {
                throw new Error('Something went wrong.');
            });
        };

        vm.editFemaleService = function(femaleJsonObject) {
            FemaleService.editFemale(femaleJsonObject).then(function(response) {
                console.log(response);
            });
        };

        vm.deleteFemaleService = function(id) {
            FemaleService.deleteFemale(id).then(function(response) {
                console.log(response);
            });
        };

        vm.getId = function() {
            return SharedProperties.getProperty();
        };

        vm.submit = function() {

            var femaleObject = {};

            femaleObject.firstName = vm.firstName;
            femaleObject.lastName = vm.lastName;
            femaleObject.dateOfBirth = vm.dateOfBirth;
            femaleObject.zipCode = vm.zipCode;
            femaleObject.bio = vm.bio;
            femaleObject.fantasticBio = vm.fantasticBio;
            femaleObject.id = vm.id;

            var femaleJsonObject = angular.toJson(femaleObject);

            vm.editFemaleService(femaleJsonObject);

            var fullName = vm.firstName + '_' + vm.lastName;
            $state.go('female_detail', {female: fullName});

        };

        vm.delete = function() {

            vm.deleteFemaleService(vm.id);

            $state.go('female_display');

        };

        var id = vm.getId();

        if (id) {
            vm.getFemaleService(id);
        } else {
            $state.go('female_display');
        }

    }]);

})();
