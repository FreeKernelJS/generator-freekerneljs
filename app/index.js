'use strict';

var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    yeoman = require('yeoman-generator'),
    pkgName = require('pkg-name'),
    updateNotifier = require('update-notifier'),
    compareVersion = require('compare-version'),
    stringLength = require('string-length'),
    pkg = require('../package.json'),
    templateName = 'freekerneljs-basic-app-md',
    generatorRoot = '',
    templatePath = '';

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

var freekerneljsGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.on('end', function () {
            console.log('Running the Grunt \'default\' task now ...');

            this.spawnCommand('grunt', ['default']).on('close', function () {
                console.log('The Grunt task has completed.');
            })
        });

        this.appname = 'freekerneljs-project';

        //this.appname = this.appname || path.basename(process.cwd());
        //this.appname = this.appname.replace(/\s+/g, '-');
    },

    initializing: function () {
        generatorRoot = this.templatePath('../../');
        templatePath = this.templatePath();

        var notifier = updateNotifier({
            pkg: pkg,
            // Check for updates every one hour.
            updateCheckInterval: 1000 * 60 * 60
        });

        if (notifier.update) {
            var fill = function (str, count) {
                return Array(count + 1).join(str);
            };

            var line1 = ' Update available: ' + chalk.green.bold(notifier.update.latest) + chalk.dim(' (current: ' + notifier.update.current + ')') + ' ',
                line2 = ' Run ' + chalk.magenta('npm update -g ' + pkg.name) + ' to update. ',
                contentWidth = Math.max(stringLength(line1), stringLength(line2)),
                line1rest = contentWidth - stringLength(line1),
                line2rest = contentWidth - stringLength(line2),
                top = chalk.yellow('┌' + fill('─', contentWidth) + '┐'),
                bottom = chalk.yellow('└' + fill('─', contentWidth) + '┘'),
                side = chalk.yellow('│'),
                updateMessage = '\n\n' + top + '\n' + side + line1 + fill(' ', line1rest) + side + '\n' + side + line2 + fill(' ', line2rest) + side + '\n' + bottom + '\n';

            console.log(updateMessage);
        }
    },

    prompting: function () {
        var done = this.async();

        var welcomeMsg = '\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '|F|r|e|e|K|e|r|n|e|l|J|S| |G|e|n|e|r|a|t|o|r|\n' +
          '+-+-+-+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
          '\n'

        console.log(welcomeMsg);

        var prompts = [{
            when: function (response) {
                if (getDirectories(templatePath).length > 1)
                    return true

                return false
            },
            type: 'list',
            name: 'template',
            message: 'Select a template',
            choices: getDirectories(templatePath),
            default: 'freekerneljs-basic-app-md'
        }, {
            when: function (response) {
                if (response.template == 'freekerneljs-basic-app')
                    return true

                return false
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
                if (response.template == 'freekerneljs-basic-app-md')
                    return true

                return false
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
            message: 'Application name',
            default: this.appname
        }, {
            type: 'input',
            name: 'title',
            message: 'Title',
            default: 'FreeKernelJS App'
        }, {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'A FreeKernelJS template application.'
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
            message: 'GitHub repository'
        }, {
            type: 'input',
            name: 'github_username',
            message: 'GitHub username'
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
                templateName = props.template;
            }

            // For easier access in the templates.
            this.slugname = this._.slugify(props.name);

            var hasMod = function (mod) {
                return props.modules.indexOf(mod) !== -1;
            };

            // Common modules
            this.angularModule = true;
            this.mocksModule = true;
            this.routeModule = true;
            this.scriptjsModule = true;
            this.cookiesModule = hasMod('cookiesModule');
            this.resourceModule = hasMod('resourceModule');
            this.messagesModule = hasMod('messagesModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');

            switch (templateName) {
                case 'freekerneljs-basic-app':
                    this.bootstrapModule = true;
                    break;
                case 'freekerneljs-basic-app-md':
                    this.materialModule = true;
                    this.iconicFont = hasMod('iconicFont');
                    break;
                default:
            }

            done();
        }.bind(this));
    },

    configuration: function () {
        this.copy(templateName + '/gitignore', '.gitignore');
        this.copy(templateName + '/bowerrc', '.bowerrc');
        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.template('_package.json', 'package.json');
        this.template(templateName + '/_bower.json', 'bower.json');
    },

    app: function () {
        this.mkdir('app');
        this.copy(templateName + '/app/_app.bootstrap.js', 'app/app.bootstrap.js');
        this.copy(templateName + '/app/_app.module.js', 'app/app.module.js');
        this.copy(templateName + '/app/_app.routes.js', 'app/app.routes.js');
        this.copy(templateName + '/app/_index.html', 'app/index.html');
        this.bulkDirectory(templateName + '/app/assets/images', 'app/assets/images');
        this.bulkDirectory(templateName + '/app/assets/scss', 'app/assets/scss');
        this.bulkDirectory(templateName + '/app/assets/css', 'app/assets/css');
        this.bulkDirectory(templateName + '/app/views', 'app/views');
        this.bulkDirectory(templateName + '/app/widgets', 'app/widgets');
        this.bulkDirectory(templateName + '/app/services', 'app/services');
    },
    
    writing: function () {
        this.copy(templateName + '/README.md', 'README.md');
    },

    test: function () {
        this.bulkDirectory(templateName + '/app/_test', 'app/_test');
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});

module.exports = freekerneljsGenerator;