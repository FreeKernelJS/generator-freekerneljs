'use strict';
var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    compareVersion = require('compare-version'),
    yeoman = require('yeoman-generator'),
    pkgName = require('pkg-name'),
    templateName = '',
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

        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this.appname.replace(/\s+/g, '-');
    },

    initializing: function() {
        this.pkg = require('../package.json');
        this.compareVersion = compareVersion;
        generatorRoot = this.templatePath('../../');
        templatePath = this.templatePath();
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
            type: 'list',
            name: 'template',
            message: 'Select a template',
            choices: getDirectories(templatePath),
            default: 'freekerneljs-basic-app'
        }, {
            when: function (response) {
                if (response.template != 'freekerneljs-demo-app')
                    return true

                return false
            },
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [{
                value: 'angularModule',
                name: 'angular',
                checked: true
            }, {
                value: 'routeModule',
                name: 'angular-route',
                checked: true
            }, {
                value: 'ariaModule',
                name: 'angular-aria',
                checked: true
            }, {
                value: 'animateModule',
                name: 'angular-animate',
                checked: true
            }, {
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
                value: 'materialModule',
                name: 'angular-material',
                checked: true
            }, {
                value: 'scriptjsModule',
                name: 'scriptjs',
                checked: true
            }, {
                value: 'iconicFont',
                name: 'material-design-iconic-font',
                checked: false
            }]
        }, {
            when: function (response) {
                if (response.template === 'freekerneljs-demo-app')
                    return true

                return false
            },
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [{
                value: 'angularModule',
                name: 'angular',
                checked: true
            }, {
                value: 'routeModule',
                name: 'angular-route',
                checked: true
            }, {
                value: 'ariaModule',
                name: 'angular-aria',
                checked: true
            }, {
                value: 'animateModule',
                name: 'angular-animate',
                checked: true
            }, {
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
                value: 'materialModule',
                name: 'angular-material',
                checked: true
            }, {
                value: 'scriptjsModule',
                name: 'scriptjs',
                checked: true
            }, {
                value: 'iconicFont',
                name: 'material-design-iconic-font',
                checked: true
            }]
        }, {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: this.appname
        }, {
            type: 'input',
            name: 'title',
            message: 'Title',
            default: 'FreeKernelJS app'
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

            templateName = props.template;

            // For easier access in the templates.
            this.slugname = this._.slugify(props.name);

            var hasMod = function (mod) {
                return props.modules.indexOf(mod) !== -1;
            };
            this.angularModule = hasMod('angularModule');
            this.routeModule = hasMod('routeModule');
            this.ariaModule = hasMod('ariaModule');
            this.animateModule = hasMod('animateModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.resourceModule = hasMod('resourceModule');
            this.messagesModule = hasMod('messagesModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');
            this.materialModule = hasMod('materialModule');
            this.scriptjsModule = hasMod('scriptjsModule');
            this.iconicFont = hasMod('iconicFont');

            done();
        }.bind(this));
    },

    configuration: function () {
        this.copy(templateName + '/gitignore', '.gitignore');
        this.copy(templateName + '/travis.yml', '.travis.yml');
        this.copy(templateName + '/bowerrc', '.bowerrc');
        this.copy('/Gruntfile.js', 'Gruntfile.js');
        this.template(templateName + '/_package.json', 'package.json');
        this.template(templateName + '/_bower.json', 'bower.json');
    },

    app: function () {
        this.mkdir('app');
        this.template(templateName + '/app/_app.bootstrap.js', 'app/app.bootstrap.js');
        this.template(templateName + '/app/_app.module.js', 'app/app.module.js');
        this.template(templateName + '/app/_app.routes.js', 'app/app.routes.js');
        this.template(templateName + '/app/_index.html', 'app/index.html');
        this.bulkDirectory(templateName + '/app/assets/images', 'app/assets/images');
        this.bulkDirectory(templateName + '/app/assets/scss', 'app/assets/scss');
        this.bulkDirectory(templateName + '/app/assets/css', 'app/assets/css');
        this.bulkDirectory(templateName + '/app/views', 'app/views');
        this.bulkDirectory(templateName + '/app/widgets', 'app/widgets');
    },

    test: function () {
        this.mkdir('test');
        this.copy(templateName + '/test/readme.md', 'test/README.md');
    },

    writing: function () {
        this.copy(templateName + '/readme.md', 'README.md');
    },
    
    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});

module.exports = freekerneljsGenerator;