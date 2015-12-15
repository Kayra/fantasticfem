(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale()
            .success(function(response) {
                vm.female = FemaleService.femaleProperties;
                SharedProperties.setProperty(vm.female.id);
            })
            .error(function() {
                vm.errorType = 'server';
            });
        };

        vm.getRandomFemaleService();

    }])


    .controller('FemaleDetailController', ['FemaleService', 'SharedProperties', '$location', '$state', function(FemaleService, SharedProperties, $location, $state) {

        var vm = this;

        vm.getFemaleService = function(identifier) {
            FemaleService.getFemale(identifier)
            .success(function(response) {
                vm.female = FemaleService.femaleProperties;
                SharedProperties.setProperty(vm.female.id);
            })
            .error(function() {
                vm.errorType = 'server';
            });
        };

        var id = SharedProperties.getProperty();

        if (id) {
            vm.getFemaleService(id);
        } else {
            $state.go('female_display');
        }

    }])


    .controller('FemaleListController', ['FemaleService', 'SharedProperties', function(FemaleService, SharedProperties) {

        var vm = this;

        vm.getFemaleListService = function() {
            FemaleService.getFemaleList()
            .success(function(response) {
                vm.females = response;
            })
            .error(function() {
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

        vm.createFemaleService = function(femaleFormData) {
            return FemaleService.createFemale(femaleFormData)
            .success(function(response) {
                SharedProperties.setProperty(response.id);
                vm.errorType = '';
            })
            .error(function() {
                vm.errorType = 'server';
            });
        };

        vm.submit = function() {

            var femaleJsonObject = FemaleUtility.formToFormData(vm.female);

            vm.createFemaleService(femaleJsonObject).success(function() {
                if (!vm.errorType) {
                    $state.go('female_detail');
                }
            });

        };

    }])


    .controller('FemaleEditController', ['FemaleService', 'FemaleUtility', 'SharedProperties', '$location', '$state', function(FemaleService, FemaleUtility, SharedProperties, $location, $state) {

        var vm = this;

        vm.getFemaleService = function(id) {
            FemaleService.getFemale(id)
            .success(function(response) {
                vm.female = FemaleService.femaleProperties;
            })
            .error(function() {
                vm.errorType = 'server';
            });
        };

        vm.editFemaleService = function(femaleJsonObject) {
            return FemaleService.editFemale(femaleJsonObject)
            .success(function(response) {
                SharedProperties.setProperty(response.id);
                vm.errorType = '';
            })
            .error(function() {
                vm.errorType = 'server';
            });
        };

        vm.deleteFemaleService = function(id) {
            return FemaleService.deleteFemale(id).error(function() {
                vm.errorType = 'server';
            })
        }

        vm.setId = function(id) {
            SharedProperties.setProperty(id);
        };

        vm.submit = function() {

            var femaleJsonObject = FemaleUtility.formToJsonObject(vm.female);

            vm.editFemaleService(femaleJsonObject).success(function() {

                if (!vm.errorType) {
                    $state.go('female_detail');
                }

            });

        };

        vm.delete = function() {

            vm.deleteFemaleService(vm.female.id).success(function() {
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
