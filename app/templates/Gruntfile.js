module.exports = function (grunt) {
    var path = require('path');

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' + 
            ' * <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * @license <%= pkg.license %>\n' +
            ' * v<%= pkg.version %>\n */\n',

        'string-replace': {
            'material-design-iconic-font': {
                files: [{
                    expand: true,
                    cwd: 'bower_components/material-design-iconic-font/scss/',
                    src: '**/*',
                    dest: 'bower_components/material-design-iconic-font/scss/'
                }],
                options: {
                    replacements: [{
                        pattern: '$md-css-prefix: md;',
                        replacement: '$md-css-prefix: mdi;'
                    }]
                }
            },
            tags: {
                files: [{
                    expand: true,
                    cwd: 'dist/debug/',
                    src: [
                        '**/*',
                        '!**/assets/fonts/**',
                        '!**/assets/images/**'
                    ],
                    dest: 'dist/debug/'
                }, {
                    expand: true,
                    cwd: 'dist/',
                    src: [
                        '**/*',
                        '!**/assets/fonts/**',
                        '!**/assets/images/**'
                    ],
                    dest: 'dist/'
                }],
                options: {
                    replacements: [
                        {
                            pattern: 'fkjs_(name)',
                            replacement: '<%= pkg.name %>'
                        },
                        {
                            pattern: 'fkjs_(title)',
                            replacement: '<%= pkg.title %>'
                        },
                        {
                            pattern: 'fkjs_(description)',
                            replacement: '<%= pkg.description %>'
                        },
                        {
                            pattern: 'fkjs_(version)',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                }
            }
        },
        copy: {
            'material-design-iconic-font': {
                src: [
                    '**/*'
                ],
                expand: true,
                cwd: 'bower_components/material-design-iconic-font/fonts',
                dest: 'app/assets/fonts'
            },
            debug: {
                src: [
                    '**/*',
                    '!**/assets/css/**',
                    '!**/assets/scss/**'
                ],
                expand: true,
                cwd: 'app',
                dest: 'dist/debug'
            },
            dist: {
                src: [
                    '**/*',
                    '!**/assets/css/**',
                    '!**/assets/scss/**'
                ],
                expand: true,
                cwd: 'app',
                dest: 'dist'
            },
            'map-debug': {
                src: [
                    '**/*.css.map'
                ],
                expand: true,
                cwd: 'app/assets/scss/temp',
                dest: 'dist/debug/assets/css'
            }
        },
        wiredep: {
            debug: {
                src: [
					'dist/debug/index.html'
                ],
                options: {

                }
            }
        },
        sass: {
            'material-design-iconic-font': {
                options: {
                    style: 'expanded',
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: 'bower_components/material-design-iconic-font/scss',
                    src: ['**/*.scss'],
                    dest: 'bower_components/material-design-iconic-font/css',
                    ext: '.css'
                }]
            },
            debug: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/assets/scss/.sass-cache'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/scss/',
                    src: ['**/*.scss'],
                    dest: 'app/assets/scss/temp',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/assets/scss/.sass-cache'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/scss/',
                    src: ['**/*.scss'],
                    dest: 'app/assets/scss/temp',
                    ext: '.css'
                }]
            }
        },
        bower_concat: {
            all: {
                dest: "dist/_bower.js",
                exclude: [
                    "jquery",
                    "modernizr"
                ],
                mainFiles: {
                    'script.js': 'dist/script.js'
                }
            }
        },
        concat: {
            options: {
                //separator: ';'
            },
            'debug-css-first': {
                src: [
                    'app/assets/scss/temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/**/custom.css',
                ],
                dest: 'dist/debug/assets/css/app.css',
            },
            'debug-css-last': {
                src: [
                    'dist/debug/assets/css/app.css',
                    'app/assets/css/custom.css'
                ],
                dest: 'dist/debug/assets/css/app.css',
            },
            'dist-libraries': {
                src: [
                    'dist/_bower.js'
                ],
                dest: 'dist/app.js',
            },
            'dist-css-first': {
                src: [
                    'app/assets/scss/temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/**/custom.css',
                ],
                dest: 'dist/assets/css/app.css',
            },
            'dist-css-last': {
                src: [
                    'dist/assets/css/app.css',
                    'app/assets/css/custom.css'
                ],
                dest: 'dist/assets/css/app.css',
            },
            'dist-stylesheets': {
                src: [
                    'bower_components/{,*/}*.css',
                    'bower_components/{,*/,*/dist/}*.css',
                    'bower_components/{,*/,*/css/}*.css',
                    'dist/assets/css/app.css',
                    '!bower_components/{,*/}*min.css',
                    '!bower_components/{,*/,*/dist/}*min.css',
                    '!bower_components/{,*/,*/css/}*min.css'
                ],
                dest: 'dist/assets/css/app.css',
            }
        },
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    dead_code: true
                },
                banner: '<%= banner %>'
            },
            libraries: {
                src: 'dist/app.js',
                dest: 'dist/app.min.js'
            }
        },
        cssmin: {
            css:{
                src: 'dist/assets/css/app.css',
                dest: 'dist/assets/css/app.min.css'
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },
        clean: {
            'debug-before': [
                'dist/debug/'
            ],
            'debug-after': [
				
            ],
            'dist-before': [
                'dist/'
            ],
            'dist-after': [
                'app/assets/scss/temp',
                'dist/app.js',
                'dist/_bower.js',
                'dist/assets/css/app.css'
            ]
        },
        watch: {
            debug: {
                files: [
                    'app/**/*',
					'!app/assets/scss/.sass-cache',
					'!app/assets/scss/temp'
                ],
                tasks: ['debug'],
                options: {
                    // Start a live reload server on the default port 35729
                    //livereload: true,
                    //spawn: false
                }
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    /**
	 * @description
	 *   Debug task(s).
	 * 
	 */
    grunt.registerTask('debug', [
        'clean:debug-before',
        'copy:debug',
        'wiredep:debug',
        'sass:debug',
        'string-replace:tags',
        'concat:debug-css-first',
        'concat:debug-css-last',
        'copy:map-debug',
        'clean:debug-after'
    ]);

    /**
	 * @description
	 *   Dist task(s).
	 * 
	 */
    grunt.registerTask('dist', [
        'clean:dist-before',
        'copy:dist',
        'sass:dist',
        'string-replace:tags',
        'concat:dist-css-first',
        'concat:dist-css-last',
        'processhtml',
        'bower_concat',
        'concat:dist-libraries',
        'concat:dist-stylesheets',
        'uglify',
        'cssmin',
        'clean:dist-after'
    ]);

    /**
	 * @description
	 *   Default task(s).
	 * 
	 */
    grunt.registerTask('default', [
        'copy:material-design-iconic-font',
        'string-replace:material-design-iconic-font',
        'sass:material-design-iconic-font',
        'debug'
    ]);
};