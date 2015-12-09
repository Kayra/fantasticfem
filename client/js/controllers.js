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


    .controller('FemaleCreateController', ['FemaleService', 'FemaleUtility', 'SharedProperties', '$state', function(FemaleService, FemaleUtility, SharedProperties, $state) {

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

            var femaleJsonObject = FemaleUtility.formToJsonObject(vm.female);

            vm.createFemaleService(femaleJsonObject).then(function() {

                var fullName = vm.firstName + "_" + vm.lastName;

                if (!vm.errorType) {
                    $state.go('female_detail', {female: fullName});
                }

            });

        };

    }])


    .controller('FemaleEditController', ['FemaleService', 'FemaleUtility', 'SharedProperties', '$location', '$state', function(FemaleService, FemaleUtility, SharedProperties, $location, $state) {

        var vm = this;

        vm.getFemaleService = function(id) {
            FemaleService.getFemale(id).then(function(response) {
                vm.female = FemaleService.femaleProperties;
            }, function() {
                vm.errorType = 'server';
            });
        };

        vm.editFemaleService = function(femaleJsonObject) {
            return FemaleService.editFemale(femaleJsonObject).then(function(response) {
                SharedProperties.setProperty(response.data.id);
                vm.errorType = '';
            }, function() {
                vm.errorType = 'server';
            });
        };

        vm.deleteFemaleService = function(id) {
            return FemaleService.deleteFemale(id).error(function() {
                vm.errorType = 'server';
            })
        }

        vm.submit = function() {

            var femaleJsonObject = FemaleUtility.formToJsonObject(vm.female);

            vm.editFemaleService(femaleJsonObject).then(function() {

                var fullName = vm.firstName + "_" + vm.lastName;

                if (!vm.errorType) {
                    $state.go('female_detail', {female: fullName});
                }

            });

        };

        vm.delete = function() {

            vm.deleteFemaleService(vm.female.id).then(function() {
                if(!vm.errorType) {
                    $state.go('female_display');
                }
            });

        };

        var id = SharedProperties.getProperty();

        if (id) {
            vm.getFemaleService(id);
        } else {
            $state.go('female_display');
        }

    }]);

})();
