# generator-freekerneljs
Generates a skeleton app which was built upon AngularJS as a framework, and Angular Material as the UI.

_Current version: 0.1.0_


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

1. Install FreeKernelJS Generator:
```
    $ npm install -g generator-freekerneljs
```

2. Create a new folder where you would like to output the generator files and switch to it:
```
    $ mkdir <project_folder>
    $ cd <project_folder>
```

3. Run the generator:
```
    $ yo freekerneljs
```

The following configuration can be set during installation:
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

You can now find the basic app located under:
    <project_folder>/dist/debug