(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale().then(function(response) {
                vm.female = FemaleService.properties;
                SharedProperties.setProperty(vm.female.id);
            }, function() {
                vm.message = "Sorry, the service is currently unavailable. Please try again.";
            });
        };

        vm.getRandomFemaleService();

    }])


    .controller('FemaleDetailController', ['FemaleService', 'FemaleUtility', 'SharedProperties', '$location', function(FemaleService, FemaleUtility, SharedProperties, $location) {

        var vm = this;

        vm.getFemaleService = function(identifier) {
            FemaleService.getFemale(identifier).then(function(response) {
                vm.female = FemaleService.properties;
                SharedProperties.setProperty(vm.female.id);
            }, function() {
                throw new Error('Something went wrong.');
            });
        };

        var id = SharedProperties.getProperty();

        if (id) {
            vm.getFemaleService(id);
        } else {
            var fullNameJson = FemaleUtility.getFemaleNameJson($location.url());
            vm.getFemaleService(fullNameJson);
        }

    }])


    .controller('FemaleListController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getFemaleListService = function() {
            FemaleService.getFemaleList().then(function(response) {
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

        vm.submit = function() {

            var femaleObject = {};

            femaleObject.firstName = vm.firstName;
            femaleObject.lastName = vm.lastName;
            femaleObject.dateOfBirth = vm.dateOfBirth;
            femaleObject.zipCode = vm.zipCode;
            femaleObject.bio = vm.bio;
            femaleObject.fantasticBio = vm.fantasticBio;

            var femaleJsonObject = angular.toJson(femaleObject);

            FemaleService.createFemaleService(femaleJsonObject);

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

        vm.submit = function() {

            var femaleObject = {};

            femaleObject.firstName = vm.female.firstName;
            femaleObject.lastName = vm.female.lastName;
            femaleObject.dateOfBirth = vm.female.dateOfBirth;
            femaleObject.zipCode = vm.female.zipCode;
            femaleObject.bio = vm.female.bio;
            femaleObject.fantasticBio = vm.female.fantasticBio;
            femaleObject.id = vm.female.id;

            var femaleJsonObject = angular.toJson(femaleObject);

            FemaleService.editFemaleService(femaleJsonObject);

            var fullName = vm.female.firstName + '_' + vm.female.lastName;
            $state.go('female_detail', {female: fullName});

        };

        vm.delete = function() {

            FemaleService.deleteFemaleService(vm.id);

            $state.go('female_display');

        };

        var id = SharedProperties.getProperty();

        if (id) {
            vm.getFemaleService(id);
        } else {
            $state.go('female_display');
        }

    }]);

})();
