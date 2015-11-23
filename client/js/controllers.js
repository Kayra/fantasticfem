(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', ['FemaleService', function(FemaleService){

        var vm = this;

        // vm.getRandomFemale = function(){
        //     vm.first_name = 'Grace';
        //     vm.last_name = 'Hopper';
        //     vm.date_of_birth = '9/12/06';
        //     vm.zip_code = '10001';
        //     vm.bio = 'Grace was an American computer scientist and United States Navy Rear Admiral.';
        //     vm.fantastic_bio = 'Absolute champion of programming. The first ever compiler? That was Grace. The term debugging? That was Grace. Implementation of the first testing standards? You know exactly who. Basically you wouldn\'t be reading this if not for Grace. At least not with technology as advanced as what we have available today.';
        // };

        vm.getRandomFemaleService = function() {
            FemaleService.getRandomFemale().then(function(response) {
                console.log(response);
            });
        };

        vm.getRandomFemaleService();

    }])

    .controller('FemaleCreateController', ['FemaleService', function(FemaleService){

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

            console.log(femaleObject);

            var femaleJsonObject = angular.toJson(femaleObject);

            vm.createFemaleService(femaleJsonObject);

        }

    }])


    .controller('FemaleEditController', function(){

    });

})();
