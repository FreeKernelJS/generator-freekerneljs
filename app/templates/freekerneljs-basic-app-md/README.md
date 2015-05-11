A basic application which uses AngularJS as the MVC framework, combined with **Angular Material** to provide the UI design. This app can be used as a starting point and basis to develop your own application.

> Please note that Angular Material is still under development and hasn't been officially released yet.

##### Structure:

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

##### Dependencies:
- <a href="https://angularjs.org/">angular</a> (v1.3.x)
- <a href="https://github.com/angular/material">angular-material</a> (v0.9.0)
- <a href="https://github.com/angular-ui/ui-router">angular-ui-router</a> (v0.2.x)
- <a href="https://github.com/ded/script.js/">script.js</a> (v2.5.7)


##### Features:
- Routing and sharing data between diffrent sections in the application
- Modular architecture that can be extended
- Best Practices for Performance
- <a href="http://sass-lang.com/">Sass</a> CSS Preprocessors
- String format service
- Documentation format to be used with ngdoc
- HTML 5 structure
