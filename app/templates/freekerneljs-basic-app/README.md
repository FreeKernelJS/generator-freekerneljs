A basic application which uses AngularJS as the MVC framework, combined with **Bootstrap** to provide the UI design. 
This app can be used as a starting point and basis to develop your own application.

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
    │   └── main
    │       ├── controller.js
    │   └── home
    │       ├── controller.js
    │       └── page.html
    │   └── page2
    │       ├── controller.js
    │       └── page.html
    └── services
        └── http.js
```

##### Dependencies:
- <a href="https://angularjs.org/">angular</a> (v1.3.x)
- <a href="https://github.com/angular-ui/ui-router">angular-ui-router</a> (v0.2.x)
- <a href="https://github.com/angular-translate/angular-translate">angular-translate</a> (v2.7.2)
- <a href="https://github.com/ded/script.js/">script.js</a> (v2.5.7)
- <a href="http://getbootstrap.com/">bootstrap</a> (v3.3.x)


##### Features:
- Routing and sharing data between different sections in the application
- Modular architecture that can be extended
- Best practices for performance
- Responsive UI
- Http service
- Localization
- <a href="http://sass-lang.com/">Sass</a> CSS preprocessors
- Documentation format to be used with ngdoc
- Unit testing with Jasmine
- HTML 5 structure

