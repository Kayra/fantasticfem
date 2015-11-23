(function(){

    var femaleAppControllers = angular.module('femaleApp.controllers', [])

    .controller('FemaleDisplayController', function(){

        var ctrl = this;

        ctrl.getRandomFemale = function(){
            ctrl.first_name = 'Grace';
            ctrl.last_name = 'Hopper';
            ctrl.date_of_birth = '9/12/06';
            ctrl.zip_code = '10001';
            ctrl.bio = 'Grace was an American computer scientist and United States Navy Rear Admiral.';
            ctrl.fantastic_bio = 'Absolute champion of programming. The first ever compiler? That was Grace. The term debugging? That was Grace. Implementation of the first testing standards? You know exactly who. Basically you wouldn\'t be reading this if not for Grace. At least not with technology as advanced as what we have available today.';
        };

        ctrl.getRandomFemale();

    })

    .controller('FemaleCreateController', function(){

        var ctrl = this;

        ctrl.submit = function($event) {

            $event.preventDefault();

            var femaleObject = {};

            femaleObject.firstName = ctrl.first_name;
            femaleObject.lastName = ctrl.last_name;
            femaleObject.dateOfBirth = ctrl.date_of_birth;
            femaleObject.zipCode = ctrl.zip_code;
            femaleObject.bio = ctrl.bio;
            femaleObject.fantasticBio = ctrl.fantastic_bio;

            console.log(femaleObject);

        }

    })

    .controller('FemaleEditController', function(){

    });

})();
