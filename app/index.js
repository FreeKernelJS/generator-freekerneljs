'use strict';

var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    yeoman = require('yeoman-generator'),
    update_notifier = require('update-notifier'),
    compare_version = require('compare-version'),
    string_length = require('string-length'),
    _ = require('underscore.string'),
    mkdirp = require('mkdirp'),
    child_process = require('child_process'),
    pkg = require('../package.json'),
    generator_root = '',
    generator_app = '',
    generator_templates = '',
    configs = [],
    templates_exist = true,
    task_error = false;

var exec = child_process.exec;

function getDirectories(srcpath) {
    if (fs.existsSync(srcpath)) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }
    else {
        return [];
    }
}

function existTemplates(srcpath, templates) {
    templates.forEach(function (name) {
        if (!fs.existsSync(path.join(srcpath, name)) || !fs.statSync(path.join(srcpath, name)).isDirectory())
            templates_exist = false;
    });

    return templates_exist;
}

var freekerneljsGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('update');
    },

    initializing: function () {
        generator_root = path.join(this.sourceRoot(), '../../');
        generator_app = path.join(this.sourceRoot(), '../');
        generator_templates = path.join(this.sourceRoot(), './');

        fs.readFile(path.join(generator_app, 'config.json'), 'utf8', function (err, data) {
            if (err) {
                this.log(chalk.red('ERROR: ') + err);
                return;
            }

            configs = JSON.parse(data);

            if (configs)
                templates_exist = existTemplates('node_modules', configs.templates);
        });

        if (fs.existsSync('config.user.json')) {
            var user_configs;

            fs.readFile('config.user.json', 'utf8', function (err, data) {
                if (err) {
                    this.log(chalk.red('ERROR: ') + err);
                    return;
                }

                user_configs = JSON.parse(data);

                if (user_configs) {
                    user_configs.templates = configs.templates;
                    user_configs.templateGroups = configs.templateGroups;
                    fs.writeFile('config.user.json', JSON.stringify(user_configs, null, 2), 'utf8', function (err, data) {
                        if (err) {
                            this.log(chalk.red('ERROR: ') + err);
                            return;
                        }
                    });

                    templates_exist = existTemplates('node_modules', user_configs.templates);

                    configs = user_configs;
                }
            });
        }

        var done = this.async();
        update_notifier({
            pkg: pkg,
            callback: function (err, update) {
                var fill = function (str, count) {
                    return Array(count + 1).join(str);
                };

                if (err) {
                    this.log(err);
                }
                else if (compare_version(update.latest, update.current) == 1) {
                    var line_1 = ' Update available: ' + chalk.green.bold(update.latest) + chalk.dim(' (current: ' + update.current + ')') + ' ',
                        line_2 = ' Run ' + chalk.magenta('npm update -g ' + pkg.name) + ' to update. ',
                        content_width = Math.max(string_length(line_1), string_length(line_2)),
                        line_1_rest = content_width - string_length(line_1),
                        line_2_rest = content_width - string_length(line_2),
                        top = chalk.yellow('┌' + fill('─', content_width) + '┐'),
                        bottom = chalk.yellow('└' + fill('─', content_width) + '┘'),
                        side = chalk.yellow('│'),
                        update_message = '\n\n' + top + '\n' + side + line_1 + fill(' ', line_1_rest) + side + '\n' + side + line_2 + fill(' ', line_2_rest) + side + '\n' + bottom + '\n';

                    this.log(update_message);
                }

                if (pkg.updateDependencies) {
                    var line_1 = ' New updates are available for download.  ',
                        line_2 = ' Run ' + chalk.magenta('yo freekerneljs --update') + ' to update.  ',
                        line_3 = ' Use this command from your ' + chalk.red('Workspace') + ' folder.  ',
                        content_width = Math.max(string_length(line_1), string_length(line_2), string_length(line_3)),
                        line_1_rest = content_width - string_length(line_1),
                        line_2_rest = content_width - string_length(line_2),
                        line_3_rest = content_width - string_length(line_3),
                        top = chalk.yellow('┌' + fill('─', content_width) + '┐'),
                        bottom = chalk.yellow('└' + fill('─', content_width) + '┘'),
                        side = chalk.yellow('│'),
                        update_message = '\n' + top + '\n' + side + line_1 + fill(' ', line_1_rest) + side + '\n' + side + line_2 + fill(' ', line_2_rest) + side + '\n' + side + line_3 + fill(' ', line_3_rest) + side + '\n' + bottom + '\n';

                    this.log(update_message);
                }

                done();
            }.bind(this)
        });
    },

    prompting: function () {
        var done = this.async();

        var welcomeMsg = '\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '|F|r|e|e|K|e|r|n|e|l|J|S| |G|e|n|e|r|a|t|o|r|\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '\n'

        this.log(welcomeMsg);

        this.slugname = '';
        if (!this.options.update) {
            var prompts = [{
                when: function (response) {
                    return configs.templates.length > 0 && configs.customTemplates.length > 0;
                },
                type: 'list',
                name: 'template_group',
                message: 'Select a template group',
                choices: configs.templateGroups,
                default: configs.defaultTemplateGroup
            }, {
                when: function (response) {
                    return response.template_group === 'FreeKernelJS' || (configs.templates.length > 0 && configs.customTemplates.length <= 0);
                },
                type: 'list',
                name: 'template',
                message: 'Select a template',
                choices: configs.templates,
                default: configs.defaultTemplate
            }, {
                when: function (response) {
                    return response.template_group === 'Custom';
                },
                type: 'list',
                name: 'template',
                message: 'Select a template',
                choices: configs.customTemplates,
                default: configs.defaultCustomTemplate
            }, {
                when: function (response) {
                    return response.template === 'freekerneljs-basic-app';
                },
                type: 'checkbox',
                name: 'modules',
                message: 'Which packages would you like to include?',
                choices: [{
                    value: 'cookiesModule',
                    name: 'angular-cookies',
                    checked: false
                }, {
                    value: 'resourceModule',
                    name: 'angular-resource',
                    checked: false
                }, {
                    value: 'messagesModule',
                    name: 'angular-messages',
                    checked: false
                }, {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize',
                    checked: false
                }, {
                    value: 'touchModule',
                    name: 'angular-touch',
                    checked: false
                }]
            }, {
                when: function (response) {
                    return response.template === 'freekerneljs-basic-app-md';
                },
                type: 'checkbox',
                name: 'modules',
                message: 'Which packages would you like to include?',
                choices: [{
                    value: 'cookiesModule',
                    name: 'angular-cookies',
                    checked: false
                }, {
                    value: 'resourceModule',
                    name: 'angular-resource',
                    checked: false
                }, {
                    value: 'messagesModule',
                    name: 'angular-messages',
                    checked: false
                }, {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize',
                    checked: false
                }, {
                    value: 'touchModule',
                    name: 'angular-touch',
                    checked: false
                }, {
                    value: 'iconicFont',
                    name: 'material-design-iconic-font',
                    checked: false
                }]
            }, {
                type: 'input',
                name: 'name',
                message: 'Project name',
                default: function (response) {
                    //var name = this.appname || path.basename(process.cwd());
                    //return name.replace(/\s+/g, '-');
                    return response.template + '-' + Math.floor((Math.random() * 1000000) + 1).toString();
                },
                validate: function (str) {
                    return fs.existsSync(str) ? chalk.red('ERROR: ') + 'Project name already exists.' : true;
                }
            }, {
                type: 'input',
                name: 'title',
                message: 'Title',
                default: 'FreeKernelJS App'
            }, {
                type: 'input',
                name: 'description',
                message: 'Description',
                default: 'A FreeKernelJS project'
            }, {
                type: 'input',
                name: 'version',
                message: 'Version',
                default: '1.0.0'
            }, {
                type: 'input',
                name: 'license',
                message: 'License',
                default: 'MIT'
            }, {
                type: 'input',
                name: 'repository',
                message: 'Repository',
                default: 'none'
            }, {
                type: 'input',
                name: 'author_name',
                message: 'Author name'
            }, {
                type: 'input',
                name: 'author_email',
                message: 'Author email'
            }, {
                type: 'input',
                name: 'author_url',
                message: 'Author url'
            }, {
                type: 'input',
                name: 'homepage',
                message: 'Home page'
            }];

            this.prompt(prompts, function (props) {
                this.props = props;

                // For easier access in the templates.
                this.slugname = _.slugify(props.name);

                if (props.template_group != 'Custom') {
                    var hasMod = function (mod) {
                        return props.modules.indexOf(mod) !== -1;
                    };

                    // Common modules.
                    this.angularModule = true;
                    this.mocksModule = true;
                    this.routeModule = true;
                    this.scriptjsModule = true;
                    this.angularTranslateModule = true;
                    this.angularTranslateLoaderStaticFilesModule = true;
                    this.cookiesModule = hasMod('cookiesModule');
                    this.resourceModule = hasMod('resourceModule');
                    this.messagesModule = hasMod('messagesModule');
                    this.sanitizeModule = hasMod('sanitizeModule');
                    this.touchModule = hasMod('touchModule');

                    switch (props.template) {
                        case 'freekerneljs-basic-app':
                            this.bootstrapModule = true;
                            break;
                        case 'freekerneljs-basic-app-md':
                            this.materialModule = true;
                            this.iconicFont = hasMod('iconicFont');
                            break;
                        default:
                    }
                }

                done();
            }.bind(this));
        }
        else {
            done();
        }
    },

    install: {
        init: function () {
            if (!this.options.update) {
                this.log('\n' + chalk.bgWhite(chalk.magenta('Creating project and installing dependencies. This may take several minutes, please wait...')) + '\n');

                mkdirp(this.slugname);

                this.fs.copyTpl(
                    this.templatePath('_package.json'),
                    this.destinationPath('package.json'),
                    {
                        name: this.slugname,
                        title: this.props.title,
                        description: this.props.description,
                        version: this.props.version,
                        license: this.props.license,
                        repository: this.props.repository,
                        author_name: this.props.author_name,
                        author_email: this.props.author_email,
                        author_url: this.props.author_url,
                        homepage: this.props.homepage
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_bowerrc'),
                    this.destinationPath('.bowerrc'),
                    {
                        name: this.slugname
                    }
                );

                if (fs.existsSync('Gruntfile.js')) fs.unlinkSync('Gruntfile.js');
                this.fs.copy(
                    this.templatePath(path.join(generator_app, 'Gruntfile.js')),
                    this.destinationPath('Gruntfile.js')
                );

                if (!fs.existsSync('config.user.json')) {
                    this.fs.copy(
                        this.templatePath(path.join(generator_app, 'config.json')),
                        this.destinationPath('config.user.json')
                    );
                }
            }
        },
        npm: function () {
            if (!this.options.update) {
                if (!fs.existsSync('node_modules') || !templates_exist) {
                    this.npmInstall(null, {
                        skipInstall: this.options['skip-install']
                    });
                }
            }
        }
    },

    end: {
        app: function () {
            if (!this.options.update) {
                this.fs.copy(
                    path.join('node_modules', this.props.template, 'app'),
                    this.destinationPath(path.join(this.slugname, 'app'))
                );

                this.fs.copy(
                    path.join('node_modules', this.props.template, 'bowerrc'),
                    this.destinationPath(path.join(this.slugname, '.bowerrc'))
                );

                if (this.props.template_group != 'Custom') {
                    this.fs.copyTpl(
                        path.join('node_modules', this.props.template, '_bower.json'),
                        this.destinationPath('bower.json'),
                        {
                            name: this.slugname,
                            version: this.props.version,
                            angularModule: this.angularModule,
                            mocksModule: this.mocksModule,
                            routeModule: this.routeModule,
                            scriptjsModule: this.scriptjsModule,
                            angularTranslateModule: this.angularTranslateModule,
                            angularTranslateLoaderStaticFilesModule: this.angularTranslateLoaderStaticFilesModule,
                            cookiesModule: this.cookiesModule,
                            resourceModule: this.resourceModule,
                            messagesModule: this.messagesModule,
                            sanitizeModule: this.sanitizeModule,
                            touchModule: this.touchModule,
                            bootstrapModule: this.bootstrapModule,
                            materialModule: this.materialModule,
                            iconicFont: this.iconicFont
                        }
                    );
                }
                else {
                    this.fs.copyTpl(
                        path.join('node_modules', this.props.template, '_bower.json'),
                        this.destinationPath('bower.json'),
                        {
                            name: this.slugname,
                            version: this.props.version
                        }
                    );
                }

                this.fs.copy(
                    'bower.json',
                    this.destinationPath(path.join(this.slugname, 'bower.json'))
                );

                this.fs.copy(
                    'package.json',
                    this.destinationPath(path.join(this.slugname, 'package.json'))
                );

                this.fs.copy(
                    'Gruntfile.js',
                    this.destinationPath(path.join(this.slugname, 'Gruntfile.js'))
                );
            }
        },
        bower: function () {
            if (!this.options.update) {
                this.bowerInstall(null, {
                    skipInstall: this.options['skip-install']
                });
            }
        },
        grunt: function () {
            if (!this.options.update) {
                this.log('Running ' + chalk.yellow('Grunt') + ' tasks now...');

                if (this.props.template == 'freekerneljs-basic-app') {
                    var done = this.async();
                    exec('grunt copy:bootstrap-fonts --project=' + this.slugname, function (err) {
                        if (err) {
                            task_error = true;
                            this.log(chalk.red('ERROR: ') + 'Grunt "copy:bootstrap-fonts" task.');
                            this.log(err);
                            this.abort = true;
                        }
                        done();
                    }.bind(this));
                }

                var done = this.async();
                exec('grunt default --project=' + this.slugname, function (err) {
                    if (err) {
                        task_error = true;
                        this.log(chalk.red('ERROR: ') + 'Grunt "default" task.');
                        this.log(err);
                        this.abort = true;
                    }
                    done();
                    task_error ? '' : this.log(chalk.green('Grunt tasks completed successfully.'));
                }.bind(this));
            }
        },
        clean: function () {
            if (fs.existsSync('.bowerrc')) fs.unlinkSync('.bowerrc');
            if (fs.existsSync('bower.json')) fs.unlinkSync('bower.json');
            if (fs.existsSync('package.json')) fs.unlinkSync('package.json');
        }
    },

    update: function () {
        if (this.options.update) {
            this.props = [];

            this.log('\n' + chalk.bgWhite(chalk.magenta('Updating dependencies. This may take several minutes, please wait...')) + '\n');

            if (fs.existsSync('package.json')) fs.unlinkSync('package.json');
                this.fs.copyTpl(
                    this.templatePath('_package.json'),
                    this.destinationPath('package.json'),
                    {
                        name: this.slugname,
                        title: this.props.title,
                        description: this.props.description,
                        version: this.props.version,
                        license: this.props.license,
                        repository: this.props.repository,
                        author_name: this.props.author_name,
                        author_email: this.props.author_email,
                        author_url: this.props.author_url,
                        homepage: this.props.homepage
                    }
                );

            this.npmInstall(null, {
                skipInstall: this.options['skip-install'],
            });

            pkg.updateDependencies = false;
            fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2), 'utf8', function (err, data) {
                if (err) {
                    this.log(chalk.red('ERROR: ') + err);
                    return;
                }
            });
        }
    }
});

module.exports = freekerneljsGenerator;