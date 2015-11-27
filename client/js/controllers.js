(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', function(FemaleService) {

        var vm = this;

        vm.injectRandomFemale = function(data) {
            vm.first_name = data.firstName;
            vm.last_name = data.lastName;
            vm.date_of_birth = data.dateOfBirth;
            vm.zip_code = data.zipCode;
            vm.bio = data.bio;
            vm.fantastic_bio = data.fantasticBio;
        };

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale().then(function(response) {
                console.log(response.data);
                vm.injectRandomFemale(response.data);
            });
        };

        vm.getRandomFemaleService();

    }])


    .controller('FemaleDetailController', ['FemaleService', '$location', function(FemaleService, $location) {

        var vm = this;

        vm.getFemaleName = function(url) {
            return url.split('/')[2].split('_');
        }

        vm.injectRandomFemale = function(data) {
            vm.first_name = data.firstName;
            vm.last_name = data.lastName;
            vm.date_of_birth = data.dateOfBirth;
            vm.zip_code = data.zipCode;
            vm.bio = data.bio;
            vm.fantastic_bio = data.fantasticBio;
        };

        vm.getFemaleService = function(firstName, lastName) {
            FemaleService.getFemale(firstName, lastName).then(function(response) {
                console.log(response.data);
                vm.injectRandomFemale(response.data);
            });
        };

        var fullNameArray = vm.getFemaleName($location.url());

        vm.getFemaleService(fullNameArray[0], fullNameArray[1]);

    }])


    .controller('FemaleListController', ['FemaleService', function(FemaleService) {

        var vm = this;

        vm.getFemaleListService = function() {
            FemaleService.getFemaleList().then(function(response) {
                console.log(response.data);
                vm.females = response.data;
            });
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

        vm.submit = function($event) {

            $event.preventDefault();

            var femaleObject = {};

            femaleObject.firstName = vm.first_name;
            femaleObject.lastName = vm.last_name;
            femaleObject.dateOfBirth = vm.date_of_birth;
            femaleObject.zipCode = vm.zip_code;
            femaleObject.bio = vm.bio;
            femaleObject.fantasticBio = vm.fantastic_bio;

            var femaleJsonObject = angular.toJson(femaleObject);

            vm.createFemaleService(femaleJsonObject);

            var fullName = vm.first_name + "_" + vm.last_name;

            $state.go('female_detail', {female: fullName});

        }

    }])


    .controller('FemaleEditController', ['FemaleService', '$location', '$state', function(FemaleService, $location, $state) {

        var vm = this;

        vm.getFemaleName = function(url) {
            return url.split('/')[2].split('_');
        }

        vm.injectRandomFemale = function(data) {
            vm.first_name = data.firstName;
            vm.last_name = data.lastName;
            vm.date_of_birth = data.dateOfBirth;
            vm.zip_code = data.zipCode;
            vm.bio = data.bio;
            vm.fantastic_bio = data.fantasticBio;
        };

        vm.getFemaleService = function(firstName, lastName) {
            FemaleService.getFemale(firstName, lastName).then(function(response) {
                console.log(response.data);
                vm.injectRandomFemale(response.data);
            });
        };

        vm.editFemaleService = function(femaleJsonObject) {
            FemaleService.editFemale(femaleJsonObject).then(function(response) {
                console.log(response);
            });
        };

        vm.deleteFemaleService = function(firstName, lastName) {
            FemaleService.deleteFemale(firstName, lastName).then(function(response) {
                console.log(response);
            })
        }

        vm.submit = function($event) {

            $event.preventDefault();

            var femaleObject = {};

            femaleObject.firstName = vm.first_name;
            femaleObject.lastName = vm.last_name;
            femaleObject.dateOfBirth = vm.date_of_birth;
            femaleObject.zipCode = vm.zip_code;
            femaleObject.bio = vm.bio;
            femaleObject.fantasticBio = vm.fantastic_bio;

            var femaleJsonObject = angular.toJson(femaleObject);

            vm.editFemaleService(femaleJsonObject);

            var fullName = vm.first_name + '_' + vm.last_name;
            $state.go('female_detail', {female: fullName});

        }

        vm.delete = function() {

            vm.deleteFemaleService(vm.first_name, vm.last_name);

            $state.go('female_display');

        }

        var fullNameArray = vm.getFemaleName($location.url());

        vm.getFemaleService(fullNameArray[0], fullNameArray[1]);

    }]);

})();
