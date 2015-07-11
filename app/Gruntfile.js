module.exports = function (grunt) {
    var
        project_folder = grunt.option('project') ? grunt.option('project') + '/' : './',
        path = require('path'),
        pkg = grunt.file.readJSON(path.join(project_folder, 'package.json')),
        bower_pkg = grunt.file.readJSON(path.join(project_folder, 'bower.json'));
    bower_dependencies = grunt.file.readJSON(path.join(project_folder, 'bower.json')).dependencies,
    bower_comp = Object.keys(bower_dependencies),
    theme_bower_pkg = '',
    theme_bower_root = '../../../bower_components/',
    theme_bower_scss = '',
    theme_bower_favicon = '';

    // Load all grunt tasks.
    require('load-grunt-tasks')(grunt, { config: path.join(project_folder, 'package.json') });

    // Show elapsed time at the end.
    require('time-grunt')(grunt);

    // Application configuration.
    grunt.initConfig({
        pkg: pkg,

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
            'default-tags': {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: [
                        '**/*',
                        '!assets/scss/app.scss',
                        '!**/assets/fonts/**',
                        '!**/assets/images/**'
                    ],
                    dest: 'app/'
                }],
                options: {
                    replacements: [
                        {
                            pattern: /fkjs_\(name\)/ig,
                            replacement: '<%= pkg.name %>'
                        },
                        {
                            pattern: /fkjs_\(title\)/ig,
                            replacement: '<%= pkg.title %>'
                        },
                        {
                            pattern: /fkjs_\(description\)/ig,
                            replacement: '<%= pkg.description %>'
                        },
                        {
                            pattern: /fkjs_\(version\)/ig,
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            pattern: /fkjs_\(theme\)/ig,
                            replacement: bower_pkg.fkjs_theme
                        },
                        {
                            pattern: /fkjs_\(theme_root\)/ig,
                            replacement: function () { return theme_bower_root }
                        },
                        {
                            pattern: /fkjs_\(theme_main\)/ig,
                            replacement: function () { return theme_bower_root + bower_pkg.fkjs_theme + '/' + theme_bower_scss }
                        },
                        {
                            pattern: /fkjs_\(theme_fonts\)/ig,
                            replacement: function () { return theme_bower_root + bower_pkg.fkjs_theme + '/app/assets/fonts/' }
                        },
                        {
                            pattern: /fkjs_\(theme_images\)/ig,
                            replacement: function () { return theme_bower_root + bower_pkg.fkjs_theme + '/app/assets/images/' }
                        },
                        {
                            pattern: /fkjs_\(favicon\)/ig,
                            replacement: function () { return theme_bower_favicon }
                        }
                    ]
                }
            },
            'dist-tags': {
                files: [{
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
                            pattern: /fkjs_\(name\)/ig,
                            replacement: '<%= pkg.name %>'
                        },
                        {
                            pattern: /fkjs_\(title\)/ig,
                            replacement: '<%= pkg.title %>'
                        },
                        {
                            pattern: /fkjs_\(description\)/ig,
                            replacement: '<%= pkg.description %>'
                        },
                        {
                            pattern: /fkjs_\(version\)/ig,
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            pattern: /fkjs_\(theme\)/ig,
                            replacement: bower_pkg.fkjs_theme
                        },
                        {
                            pattern: /fkjs_\(theme_root\)/ig,
                            replacement: function () { return theme_bower_root }
                        },
                        {
                            pattern: /fkjs_\(theme_main\)/ig,
                            replacement: function () { return theme_bower_root + bower_pkg.fkjs_theme + '/' + theme_bower_scss }
                        },
                        {
                            pattern: /fkjs_\(theme_fonts\)/ig,
                            replacement: '../fonts/'
                        },
                        {
                            pattern: /fkjs_\(theme_images\)/ig,
                            replacement: '../images/'
                        },
                        {
                            pattern: /fkjs_\(favicon\)/ig,
                            replacement: function () { return theme_bower_favicon }
                        }
                    ]
                }
            }
        },
        copy: {
            'bootstrap-fonts': {
                src: [
                    '**/*'
                ],
                expand: true,
                cwd: 'bower_components/bootstrap/fonts',
                dest: 'app/assets/fonts'
            },
            'material-design-iconic-font': {
                src: [
                    '**/*'
                ],
                expand: true,
                cwd: 'bower_components/material-design-iconic-font/fonts',
                dest: 'app/assets/fonts'
            },
            dist: {
                src: [
                    '**/*',
                    '!**/test/**',
                    '!**/docs/**',
                    '!**/assets/css/**',
                    '!**/src/**/*.js'
                ],
                expand: true,
                cwd: 'app',
                dest: 'dist'
            }
        },
        wiredep: {
            build: {
                src: [
                    'app/index.html'
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
            'compile-scss': {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/assets/scss/.sass-cache'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/scss/',
                    src: [
                        '**/*.scss',
                        '!app.scss'
                    ],
                    dest: 'app/assets/scss/.temp',
                    ext: '.css'
                }]
            }
        },
        bower_concat: {
            all: {
                dest: 'dist/_bower.js',
                cssDest: 'dist/_bower.css',
                exclude: [

                ],
                mainFiles: {
                    'bootstrap': 'dist/css/bootstrap.css'
                },
                dependencies: {
                    'angular': ['jquery']
                },
                bowerOptions: {
                    relative: false
                },
                callback: function (main_files, component) {
                    var component_dependencies,
                        dependencies = [];

                    if (grunt.file.exists(path.join('bower_components/', component, 'bower.json'))) {
                        component_dependencies = grunt.file.readJSON(path.join('bower_components/', component, 'bower.json')).dependencies;
                        dependencies = component_dependencies ? Object.keys(component_dependencies) : [];
                    }

                    return main_files.map(function (filepath) {
                        return ((bower_comp.indexOf(component) > -1 || dependencies.length > -1) && component != 'script.js') ? filepath : false;
                    });
                }
            }
        },
        ngAnnotate: {
            dist: {
                files: {
                    'dist/app.js.files.js': [
                        'app/src/**/*.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                //separator: ';'
            },
            'compile-css-first': {
                src: [
                    'app/assets/scss/.temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/app.css',
                    '!**/app/assets/css/**/custom.css'
                ],
                dest: 'app/assets/css/app.css',
            },
            'compile-css-last': {
                src: [
                    'app/assets/css/app.css',
                    'app/assets/css/custom.css'
                ],
                dest: 'app/assets/css/app.css'
            },
            'dist-libraries': {
                src: [
                    'dist/_bower.js'
                ],
                dest: 'dist/app.libraries.js'
            },
            'dist-js-files': {
                src: [
                    'dist/app.libraries.js',
                    'dist/app.js.files.js'
                ],
                dest: 'dist/app.js'
            },
            'dist-stylesheets': {
                src: [
                    'dist/_bower.css'
                ],
                dest: 'dist/assets/css/app.css',
            },
            'dist-css-first': {
                src: [
                    'dist/_bower.css',
                    'app/assets/scss/.temp/*.css',
                    'app/assets/css/**/*.css',
                    '!**/app/assets/css/app.css',
                    '!**/app/assets/css/**/custom.css'
                ],
                dest: 'dist/assets/css/app.css',
            },
            'dist-css-last': {
                src: [
                    'dist/assets/css/app.css',
                    'app/assets/css/custom.css'
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
            css: {
                src: 'dist/assets/css/app.css',
                dest: 'dist/assets/css/app.min.css'
            }
        },
        processhtml: {
            options: {
                data: {
                    html_tag: '<html ng-app="<%= pkg.name %>">'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        },
        clean: {
            'default-after': [
                'app/assets/scss/app-temp-default.scss'
            ],
            'compile-scss-after': [
                'app/assets/scss/app-temp-default.scss'
            ],
            'dist-before': [
                'dist/'
            ],
            'dist-after': [
                'app/assets/scss/.temp',
                'app/assets/scss/app-temp-dist.scss',
                'dist/app.js',
                'dist/app.libraries.js',
                'dist/app.js.files.js',
                'dist/assets/css/app.css',
                'dist/assets/scss',
                'dist/_bower.js',
                'dist/_bower.css',
                'dist/src/services'
            ],
            'docs': [
                'dist/docs'
            ]
        },
        watch: {
            debug: {
                files: [
                    'app/**/*',
					'!app/assets/scss/.sass-cache',
					'!app/assets/scss/.temp'
                ],
                tasks: ['compile-scss'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                    spawn: false
                }
            }
        },
        ngdocs: {
            options: {
                dest: 'app/docs',
                startPage: '/api/app',
                html5Mode: false,
                title: '<%= pkg.title %> Docs',
                titleLink: '#/api/app',
                bestMatch: true,
                sourceLink: '../../{{file}}'
            },
            api: {
                src: [
                    'app/src/**/*.js',
                    'app/app.js',
                    'app/docs/content/api/*.ngdoc'
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'app/test/karma.conf.js'
            }
        }
    });

    /**
	 * @description
	 *   Now that we have loaded the package.json and the node_modules we set the base path
     *   for the actual execution of the tasks.
	 * 
	 */
    grunt.file.setBase(project_folder);

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    /**
	 * @description
	 *   Running theme init task(s).
	 * 
	 */
    grunt.registerTask('theme-init', '', function () {
        if (bower_pkg.fkjs_theme != '') {
            theme_bower_pkg = grunt.file.readJSON(path.join('bower_components/', bower_pkg.fkjs_theme, '/bower.json'));

            if (theme_bower_pkg.main.length > 0) {
                theme_bower_pkg.main.forEach(function (entry) {
                    var result = entry.match(/\.[0-9a-z]+$/i);

                    if (result) {
                        switch (result[0]) {
                            case '.ico':
                                if (entry.match(/favicon.ico/i))
                                    theme_bower_favicon = entry;
                                break;
                            case '.scss':
                                if (entry.match(/_app.scss/i))
                                    theme_bower_scss = entry;
                                break;
                        }
                    }
                    else {
                        //console.log(entry);
                    }
                });
            }
        }
    });

    /**
	 * @description
	 *   Running theme copy task(s).
	 * 
	 */
    grunt.registerTask('theme-copy', '', function () {
        if (bower_pkg.fkjs_theme != '') {
            var srcPath = 'bower_components/' + bower_pkg.fkjs_theme + '/app/assets/',
				destPath = 'app/assets',
				options = {
				    cwd: srcPath,
				    filter: 'isFile',
				    dot: true
				},
				glob = '**/*';

            grunt.file.expand(options, glob).forEach(function (file) {
                grunt.file.copy(path.join(srcPath, file), path.join(destPath, file));
            });
        }
    });

    /**
	 * @description
	 *   Running before default tags task(s).
	 * 
	 */
    grunt.registerTask('before-default-tags', '', function () {
        var srcPath = 'app/assets/scss/',
			destPath = 'app/assets/scss/';

        grunt.file.copy(path.join(srcPath, 'app.scss'), path.join(destPath, 'app-temp-default.scss'));
    });

    /**
	 * @description
	 *   Running before dist task(s).
	 * 
	 */
    grunt.registerTask('after-dist-tags', '', function () {
        var srcPath = 'dist/assets/scss/',
			destPath = 'app/assets/scss/';

        grunt.file.copy(path.join(srcPath, 'app.scss'), path.join(destPath, 'app-temp-dist.scss'));
    });

    /**
	 * @description
	 *   Running test task(s).
	 * 
	 */
    grunt.registerTask('test', [
		'karma'
    ]);

    /**
	 * @description
	 *   Generate documentation (ngDocs) task(s).
	 * 
	 */
    grunt.registerTask('docs', [
		'clean:docs',
        'ngdocs'
    ]);

    /**
	 * @description
	 *   Compile SCSS task(s).
	 * 
	 */
    grunt.registerTask('compile-scss', [
        'theme-init',
        'before-default-tags',
        'string-replace:default-tags',
        'sass:compile-scss',
        'concat:compile-css-first',
        'concat:compile-css-last',
        'clean:compile-scss-after'
    ]);

    /**
	 * @description
	 *   Dist task(s).
	 * 
	 */
    grunt.registerTask('dist', [
        'clean:dist-before',
		'theme-init',
        'copy:dist',
        'string-replace:dist-tags',
		'after-dist-tags',
        'processhtml',
        'bower_concat',
        'sass:compile-scss',
        'concat:dist-stylesheets',
        'concat:dist-css-first',
        'concat:dist-css-last',
        'cssmin',
        'ngAnnotate:dist',
        'concat:dist-libraries',
        'concat:dist-js-files',
        'uglify',
        'clean:dist-after'
    ]);

    /**
	 * @description
	 *   Default task(s).
	 * 
	 */
    grunt.registerTask('default', [
        'theme-init',
        'theme-copy',
        'copy:material-design-iconic-font',
        'string-replace:material-design-iconic-font',
        'sass:material-design-iconic-font',
        'before-default-tags',
        'string-replace:default-tags',
        'sass:compile-scss',
        'concat:compile-css-first',
        'concat:compile-css-last',
        'wiredep:build',
        'clean:default-after'
    ]);
};