# generator-freekerneljs
Generates a skeleton app which was built upon AngularJS as a framework, and Angular Material as the UI.
The skeleton app can be used to start and build your own application.

*Current version: see CHANGELOG.md*


The Skeleton App
----------------
It's a basic application in the following structure:

```
.
├── app
│   ├── index.html
│   ├── app.bootstrap.js
│   ├── app.module.js
│   ├── app.routes.js
│   ├── assets
│   │   ├── css
│       └── images
│   ├── widgets
│   │   ├── header
│   │   │   ├── module.js
│   │   │   └── template.html
│   │   └── navbar
│   │       ├── module.js
│   │       └── template.html
│   ├── views
│   │   └── home
│   │       ├── controller.js
│   │       └── page.html
│   └── services
│       └── utils.js
└── test
```


Installation
------------

1) Install FreeKernelJS Generator globally: 
``` 
    $ npm install -g generator-freekerneljs 
```

2) Create a new folder where you would like for your app files to be output by the generator, and switch to it:
```
    $ mkdir <project_folder>
    $ cd <project_folder>
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

3) Run the generator:
``` 
    $ yo freekerneljs 
```

4) After installation is successful you can find all the output files at this path:
``` 
    $ cd <project_folder>/dist/debug
```
You can copy them to your server root and run the application in browser.

This should be the result:


<img src="docs/images/Clipboard01.png">

An example of an application that has been developed using FreeKernelJS Generator:
<a href="https://github.com/FreeKernelJS/demos/tree/master/freekerneljs-demo-app">Demo App</a>
