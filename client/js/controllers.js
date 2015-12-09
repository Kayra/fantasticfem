(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale().then(function(response) {
                vm.female = FemaleService.femaleProperties;
                SharedProperties.setProperty(vm.female.id);
            }, function() {
                vm.errorType = 'server';
            });
        };

        vm.getRandomFemaleService();

    }])


    .controller('FemaleDetailController', ['FemaleService', 'FemaleUtility', 'SharedProperties', '$location', function(FemaleService, FemaleUtility, SharedProperties, $location) {

        var vm = this;

        vm.getFemaleService = function(identifier) {
            FemaleService.getFemale(identifier).then(function(response) {
                vm.female = FemaleService.femaleProperties;
                SharedProperties.setProperty(vm.female.id);
            }, function() {
                vm.errorType = 'server';
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
            }, function() {
                vm.errorType = 'server';
            });
        };

        vm.setId = function(id) {
            SharedProperties.setProperty(id);
        };

        vm.getFemaleListService();

    }])


    .controller('FemaleCreateController', ['FemaleService', 'SharedProperties', '$state', function(FemaleService, SharedProperties, $state) {

        var vm = this;

        vm.createFemaleService = function(femaleJsonObject) {
            return FemaleService.createFemale(femaleJsonObject).then(function(response) {
                SharedProperties.setProperty(response.data.id);
                vm.errorType = '';
            }, function() {
                vm.errorType = 'server';
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

            vm.createFemaleService(femaleJsonObject).then(function() {

                var fullName = vm.firstName + "_" + vm.lastName;

                if (!vm.errorType) {
                    $state.go('female_detail', {female: fullName});
                }

            });

        }

    }])


    .controller('FemaleEditController', ['FemaleService', 'SharedProperties', '$location', '$state', function(FemaleService, SharedProperties, $location, $state) {

        var vm = this;

        vm.getFemaleService = function(id) {
            FemaleService.getFemale(id).then(function(response) {
                vm.female = FemaleService.femaleProperties;
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
