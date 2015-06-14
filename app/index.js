'use strict';

var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    yeoman = require('yeoman-generator'),
    pkg_name = require('pkg-name'),
    update_notifier = require('update-notifier'),
    compare_version = require('compare-version'),
    string_length = require('string-length'),
    _ = require('underscore.string'),
    mkdirp = require('mkdirp'),
    child_process = require('child_process'),
    pkg = require('../package.json'),
    template_name = 'freekerneljs-basic-app-md',
    generator_root = '',
    template_path = '',
    task_error = false;

var exec = child_process.exec;

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

var freekerneljsGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        
        this.on('end', function () {
            this.log('Running ' + chalk.yellow('Grunt') + ' tasks now...');

            if (template_name == 'freekerneljs-basic-app') {
                var done = this.async();
                exec('grunt copy:bootstrap-fonts --project=' + this.slugname, function (err) {
                    if (err) {
                        task_error = true;
                        this.log(chalk.red('ERROR: ') + 'Grunt "copy:bootstrap-fonts" task.');
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
                    this.abort = true;
                }
                done();
            }.bind(this));

            var done = this.async();
            exec('grunt clean-workspace', function (err) {
                if (err) {
                    task_error = true;
                    this.log(chalk.red('ERROR: ') + 'Grunt "clean-workspace" task.');
                    this.abort = true;
                }
                done();
                task_error ? '' : this.log(chalk.green('Grunt tasks completed successfully.'));
            }.bind(this));
        });
    },

    initializing: function () {
        generator_root = this.templatePath('../../');
        template_path = this.templatePath();

        var done = this.async();
        update_notifier({
            pkg: pkg,
            callback: function (err, update) {
                if (err) {
                    this.log(err);
                }
                else if (compare_version(update.latest, update.current) == 1) {
                    var fill = function (str, count) {
                        return Array(count + 1).join(str);
                    };

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

                done();
            }.bind(this)
        })
    },

    prompting: function () {
        var done = this.async();

        var welcomeMsg = '\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '|F|r|e|e|K|e|r|n|e|l|J|S| |G|e|n|e|r|a|t|o|r|\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '\n'

        this.log(welcomeMsg);

        var prompts = [{
            when: function (response) {
                return getDirectories(template_path).length > 1;
            },
            type: 'list',
            name: 'template',
            message: 'Select a template',
            choices: getDirectories(template_path),
            default: 'freekerneljs-basic-app-md'
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
            
            if (props.template) {
                template_name = props.template;
            }

            // For easier access in the templates.
            this.slugname = _.slugify(props.name);

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

            switch (template_name) {
                case 'freekerneljs-basic-app':
                    this.bootstrapModule = true;
                    break;
                case 'freekerneljs-basic-app-md':
                    this.materialModule = true;
                    this.iconicFont = hasMod('iconicFont');
                    break;
                default:
            }

            mkdirp(this.slugname);

            done();
        }.bind(this));
    },
    
    configuration: function () {
        // Workspace
        if (fs.existsSync('package.json')) fs.unlinkSync('package.json');
        this.template(template_name + '/_package.json', 'package.json');
        this.template(template_name + '/_bower.json', 'bower.json');
        this.template('_bowerrc', '.bowerrc');
        if (fs.existsSync('Gruntfile.js')) fs.unlinkSync('Gruntfile.js');
        this.copy('Gruntfile.js', 'Gruntfile.js');
        
        // Project folder
        this.template(template_name + '/_package.json', this.slugname + '/package.json');
        this.template(template_name + '/_bower.json', this.slugname + '/bower.json');
        this.copy('Gruntfile.js', this.slugname + '/Gruntfile.js');
        this.copy(template_name + '/gitignore', this.slugname + '/.gitignore');
        this.copy(template_name + '/bowerrc', this.slugname + '/.bowerrc');
    },

    app: function () {
        this.copy(template_name + '/app/_app.bootstrap.js', this.slugname + '/app/app.bootstrap.js');
        this.copy(template_name + '/app/_app.module.js', this.slugname + '/app/app.module.js');
        this.copy(template_name + '/app/_app.routes.js', this.slugname + '/app/app.routes.js');
        this.copy(template_name + '/app/_index.html', this.slugname + '/app/index.html');
        this.bulkDirectory(template_name + '/app/assets/images', this.slugname + '/app/assets/images');
        this.bulkDirectory(template_name + '/app/assets/scss', this.slugname + '/app/assets/scss');
        this.bulkDirectory(template_name + '/app/assets/css', this.slugname + '/app/assets/css');
        this.bulkDirectory(template_name + '/app/views', this.slugname + '/app/views');
        this.bulkDirectory(template_name + '/app/widgets', this.slugname + '/app/widgets');
        this.bulkDirectory(template_name + '/app/services', this.slugname + '/app/services');
        this.bulkDirectory(template_name + '/app/data', this.slugname + '/app/data');
    },
    
    writing: function () {
        this.copy(template_name + '/README.md', this.slugname + '/README.md');
        this.copy(template_name + '/README.md', 'README.md');
    },

    test: function () {
        this.bulkDirectory(template_name + '/app/_test', this.slugname + '/app/_test');
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});

module.exports = freekerneljsGenerator;