
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
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "styles/css/styles.css",
                        "*.html",
                        "js/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync', 'watch']);

};
