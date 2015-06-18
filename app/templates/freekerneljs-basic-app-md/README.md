A basic application which uses AngularJS as the MVC framework, combined with **Angular Material** to provide the UI design. This app can be used as a starting point and basis to develop your own application.

> Please note that Angular Material is still under development and hasn't been officially released yet.


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



##### Dependencies:
- <a href="https://angularjs.org/">angular</a> (v1.4.x)
- <a href="https://github.com/angular/material">angular-material</a> (v0.9.x)
- <a href="https://github.com/angular-ui/ui-router">angular-ui-router</a> (v0.2.x)
- <a href="https://github.com/angular-translate/angular-translate">angular-translate</a> (v2.7.2)
- <a href="https://github.com/ded/script.js/">script.js</a> (v2.5.7)
 


##### Structure:

```
.
└── app
    ├── index.html
    ├── app.bootstrap.js
    ├── app.module.js
    ├── app.routes.js
    ├── _test
    ├── assets
    │   ├── css
    │   └── images
    ├── data
    │   ├── locale
    │   └── server
    ├── services
    │   └── http.js
    ├── widgets
    │   ├── header
    │   │   ├── module.js
    │   │   └── template.html
    │   └── navbar
    │       ├── module.js
    │       └── template.html
    └── views
        ├── main
        │   └── controller.js
        ├── home
        │   ├── controller.js
        │   └── page.html
        └── page2
            ├── controller.js
            └── page.html
```

- `app.bootstrap.js`: required by index.html. This file is responsible for loading all app's JS dependencies (including app.module.js, app.routes.js) first, then bootstrap the application.
- `app.module.js`: this file lists all the modules required by the application.
- `app.routes.js`: this file is using angular-ui-router package to declare all routes for pages in the application.
- `_test`: this folder contains spec files to run tests with Jasmine.
- `assets`:  this folder contains any resources being used by the application.
- `data`: mock-up data. The "server" folder contains mock up JSON, the "locale" folder contains files for localization. Both can be moved to the back-end in a real live environment.
- `services`: this folder contains any services/providers/factories/utilities being used in the application.
- `widgets`: this folder contains the different directives.
- `views`: this folder contains views that represent pages (one view per page). With the exception of the main controller - this controller is responsible for managing global aspects of the application so it doesn't have a view.
