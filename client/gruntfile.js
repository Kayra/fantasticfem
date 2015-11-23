
module.exports = function(grunt) {

    var modRewrite = require('connect-modrewrite');

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
                        "partials/*.html",
                        "js/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./",
                        middleware: [
                            modRewrite(['!\.html|\.js|\.css|\.png$ /index.html [L]'])
                        ]
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
