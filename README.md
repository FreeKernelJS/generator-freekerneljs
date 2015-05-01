# generator-freekerneljs

[![Built with Yeoman](http://pixel-cookers.github.io/built-with-badges/yeoman/yeoman-long.png)](http://yeoman.io/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Generates a skeleton app which was built upon AngularJS as a framework, and Angular Material as the UI.
The skeleton app can be used to start and build your own application.


The Skeleton App
----------------
It's a basic application in the following structure:

```
.
└── app
    ├── index.html
    ├── app.bootstrap.js
    ├── app.module.js
    ├── app.routes.js
    ├── assets
    │   ├── css
    │   └── images
    ├── widgets
    │   ├── header
    │   │   ├── module.js
    │   │   └── template.html
    │   └── navbar
    │       ├── module.js
    │       └── template.html
    ├── views
    │   └── home
    │       ├── controller.js
    │       └── page.html
    └── services
        └── utils.js
```
###### Dependencies:
- angular (v1.3.13)
- angular-material (v0.8.2)
- angular-ui-router (v0.2.13)
- script.js (v2.5.7)


Installation
------------

1) First, setup your environment if you have not done so yet.
- Install Node.js (including npm) <https://nodejs.org> 
- Then Install Bower and Yeoman globally:
``` 
    $ npm install -g bower
    $ npm install -g yo
```


2) Install FreeKernelJS Generator globally: 
``` 
    $ npm install -g generator-freekerneljs 
```

3) Create a new folder where you would like for your app files to be output by the generator, and switch to it:
```
    $ mkdir <project_folder>
    $ cd <project_folder>
```


4) Run the generator:
``` 
    $ yo freekerneljs 
```
If the generator is already installed and a newer version is available you can use this command to upgrade:
``` 
    $ npm update -g generator-freekerneljs 
```
During installation, various configuration values can be set for your application. 
The generator wizard will prompt you for values, or you can leave all as default by pressing enter:
- Modules to be included
- Project name
- Title of the application
- Description
- Version
- License
- GitHub repository
- GitHub username
- Author name
- Author email
- Author url
- Home page


5) After installation is successful you can find all the output files at this path:
``` 
    $ cd <project_folder>/dist/debug
```
You can copy them to your server root and run the application in browser.

This should be the result:


<img src="docs/images/Clipboard01.png">

Here is an example to an application that has been developed using FreeKernelJS Generator:
<a href="https://github.com/FreeKernelJS/demos/tree/master/freekerneljs-demo-app">Demo App</a>


Development Tools
-----------------
You might want to consider using these tools to develop the application:
- Install <a href="http://gruntjs.com/">Grunt</a> and use it to run tasks such as - debug, dist and watch.
``` 
    $ npm install -g grunt-cli
```
- Install <a href="https://www.ruby-lang.org/en/">Ruby</a> to compile the scss files (manually or through Grunt). 
``` 
    $ gem install sass
    $ npm install grunt-contrib-sass --save-dev
```


Release History
----------------
See the [CHANGELOG](CHANGELOG.md).
