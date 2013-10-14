module.exports = function (grunt) {

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {

            script: {
                files: ['js/common.js'],
                tasks: ['uglify']
            },

            livereload: {
                options: {
                    livereload: true,
                    tasks: ['stylus:compile']
                },
                files: ['*.html', 'css/style.min.css']
            },

            css: {
                files: ['stylus/*.styl'],
                tasks: ['stylus:compile']
            }
        },

        stylus: {

            compile: {
                options: {
                    compress: true,
                    paths: ['stylus']
                },
                files: {
                    'css/style.min.css': 'stylus/style.styl'
                }
            },

            normal: {
                options: {
                    compress: false,
                    paths: ['stylus']
                },
                files: {
                    'css/style.css': 'stylus/style.styl'
                }
            }

        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'js/common.min.js': 'js/common.js'
                }
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: '91.106.201.84',
                    port: 21,
                    authKey: 'projects'
                },
                //src: 'D:/Webservers/domains/dmb.dev/',
                src: 'C:/Webservers/domains/dmb.dev/',
                dest: '/kuznetsovanton.ru/public_html/projects/dmb',
                exclusions: ['node_modules', '**/Thumbs.db', '.git', '.idea', '.gitignore', '.ftppass']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Our tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['ftp-deploy:build']);

};