# generator-freekerneljs

[![Built with Yeoman](http://pixel-cookers.github.io/built-with-badges/yeoman/yeoman-long.png)](http://yeoman.io/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Generates a web app structured from a template.
This app can then be used to start and develop your own application.

Table of Contents:
-  [Templates](#templates)
-  [Installation](#installation)
-  [Create a New App](#generating)
-  [Running the Application](#running)
-  [Use Grunt Tasks in Development](#tools)
-  [Release History](#history)


### <a name="templates"></a> Templates
------------
Templates available for producing applications:
- [freekerneljs-basic-app](app/templates/freekerneljs-basic-app): a basic application which uses AngularJS with Bootstrap
- [freekerneljs-basic-app-md](app/templates/freekerneljs-basic-app-md): a basic application which uses AngularJS with Angular Material


### <a name="installation"></a> Installation
------------

###### Step 1: Setup your environment if you have not done so yet.
- Install [Node.js](https://nodejs.org) (including npm)
- Then Install <a href="http://bower.io/">Bower</a> and <a href="http://yeoman.io/">Yeoman</a> globally:
``` 
    $ npm install -g bower
    $ npm install -g yo
```


###### Step 2: Install FreeKernelJS Generator globally: 
``` 
    $ npm install -g generator-freekerneljs 
```


### <a name="generating"></a> Create a New App
------------

###### Step 1: Create a new folder 

Create a new *"project_folder"* where you would like for your app files to be output by the generator, and switch to it. 
>For documentation purposes it is called *"project_folder"* but you can use any name that you want.

This folder will contain both the development and the distribution versions of the application.
You can create the project folder directly under your local server root, or copy the files there after generation.
```
    $ mkdir <project_folder>
    $ cd <project_folder>
```


###### Step 2: Run the generator:
``` 
    $ yo freekerneljs 
```
If the generator is already installed and a newer version is available it will notify you of this. Alternatively you can use this command to upgrade:
``` 
    $ npm update -g generator-freekerneljs 
```
During installation, various configuration values can be set for your application. 
The generator wizard will prompt you for values, or you can accept default by pressing enter. 
After the installation is complete you can still set these values manually.

<img src="docs/images/freekerneljs-generator.png">

Available configurations:
- **Select a template**. Select which template you would like to use. For more details see [Templates](#templates) section above.
- **Packages to be included**. Use arrows and spacebar to select which packages to inclued in your application. This can be managed later from bower.json file.
- **Application name**. The name of the main module of the application in the JavaScript files. By default it will use the name of the *"project_folder"* which contains this application.
- **Title of the application**. The window title in browser, and the name of the application as displayed above the navigation bar. This can be managed later in code (see index.html, widgets/navbar/template.html)
- **Description**. The description of this application, can be managed in package.json
- **Version**. The <a href="http://semver.org/">version</a> of this application, can be managed in package.json (default to 1.0.0).
- **License**. The license of this application, can be managed in package.json (default to MIT).
- **GitHub repository**. Can be managed in package.json
- **GitHub username**. Can be managed in package.json
- **Author name**. Can be managed in package.json
- **Author email**. Can be managed in package.json
- **Author url**. Can be managed in package.json
- **Home page**. Can be managed in package.json


###### Step 3: Output files

After installation is successful you can find the output files through the output path:
``` 
    $ cd <project_folder>/app
```

### <a name="running"></a> Running the application
-----------------
The *"project_folder"* should now have the following folders and files:
```
.
└── project_folder
    ├── app/
    ├── bower_components/
    ├── test/
    ├── .bowerrc
    ├── bower.json
    └── Gruntfile.js
```
- app folder: containes the application.
- bower_components folder: contains external packages that were installed by Bower.
- test folder: for unit testing.
- .bowerrc file: can be edited to save external packages managed by Bower into a different location.
- bower.json file: a list of all external packages managed by Bower. You can add/change packages and/or versions.
- Gruntfile.js file: contains Grunt tasks. Can be edited to add more tasks. For details please refer to [Use Grunt Tasks in Development](#tools) section.

If the *"project_folder"* is not located directly under your server root, you can copy the *"app"* folder there and run the application in browser.

This should be the result:


<img src="docs/images/Clipboard01.png">

Here is an example to an application that has been developed using FreeKernelJS Generator, and is based on [freekerneljs-basic-app-md](app/templates/freekerneljs-basic-app-md) template:

<a href="https://github.com/FreeKernelJS/demos/tree/master/freekerneljs-demo-app">Demo App</a>


> For general questions and discussions, use the
  [FreeKernelJS Forum](http://www.forum.freekerneljs.org/).


### <a name="tools"></a> Use Grunt Tasks in Development
-----------------
You might want to consider installing <a href="http://gruntjs.com/">Grunt</a>, to use runner tasks which are provided by the FreeKernelJS generator during development.
The installation of Grunt is global, but you must run the different tasks from within the project folder.
- **Install Grunt**:
``` 
    $ npm install -g grunt-cli
```

- **Watch task**: monitoring your application for changes each time you make changes and save files. 
To be able to use this task you need first to open *"index.html"* file from *"project_folder/app"*, and uncomment the following line:
``` 
 <!-- <script src="//localhost:35729/livereload.js"></script> -->
``` 
Then
``` 
    $ cd <project_folder>
    $ grunt watch
```

- **Dist task**: compiling scss files, compress JavaScript code, and publish the application into the *"dist"* folder. 
``` 
    $ cd <project_folder>
    $ grunt dist
```
After running this task you can find the deployed files under *"project_folder/dist"*.
You can now run the application in development or production mode:

<http://localhost/project_folder/app> will display the application in development mode.

<http://localhost/project_folder/dist> will display the application in production mode.


- **Compile task**: compiling scss files into css, creates the *"app.css"* file.
``` 
    $ cd <project_folder>
    $ grunt compile-scss
```

> Please note that for both *"dist"* and *"compile-scss"* tasks you will need to have <a href="https://www.ruby-lang.org/en/">Ruby</a> installed for your environment to work.
``` 
    $ gem install sass
```

- **Docs task**: generates documentation for AngularJS code which was written in a certain format. For more information please refer to their offcial wiki: [Writing AngularJS Documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
``` 
    $ cd <project_folder>
    $ grunt docs
```


### <a name="history"></a> Release History
----------------
See the [CHANGELOG](CHANGELOG.md).
