
module.exports = function(grunt) {
    grunt.initConfig({

        watch: {
            sass: {
                files: "styles/sass/*.sass",
                tasks: ['sass']
            }
        },

        sass: {
            dev: {
                files: {
                    "styles/css/styles.css" : "styles/sass/styles.sass"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
