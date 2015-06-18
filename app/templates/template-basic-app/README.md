A basic application which uses AngularJS as the MVC framework, combined with **Bootstrap** to provide the UI design. 
This app can be used as a starting point and basis to develop your own application.



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
- <a href="https://github.com/angular-ui/ui-router">angular-ui-router</a> (v0.2.x)
- <a href="https://github.com/angular-translate/angular-translate">angular-translate</a> (v2.7.2)
- <a href="https://github.com/ded/script.js/">script.js</a> (v2.5.7)
- <a href="http://getbootstrap.com/">bootstrap</a> (v3.3.x)
 


##### Structure:

```
.
└── app/
    ├── assets/
    │   ├── css
    │   ├── fonts
    │   ├── images
    │   └── sass
    ├── data/
    │   ├── locale/
    │   └── server/
    ├── src/
    │   ├── services/
    │   │   └── http.js
    │   ├── views/
    │   │   ├── main/
    │   │   │   └── controller.js
    │   │   ├── home/
    │   │   │   ├── controller.js
    │   │   │   └── page.html
    │   │   └── page2/
    │   │       ├── controller.js
    │   │       └── page.html    
    │   ├── widgets/
    │   │   ├── header/
    │   │   │   ├── module.js
    │   │   │   └── template.html
    │   │   └── navbar/
    │   │       ├── module.js
    │   │       └── template.html
    │   ├── app.module.js
    │   └── app.routes.js
    ├── test/
    │   ├── spec/
    │   └── karma.conf.js
    ├── app.js
    └── index.html
```
- `assets`:  this folder contains any resources being required by the application.
- `data`: mock-up data. Both "server" and "locale" folders can be moved to the back-end in a real live environment.
  * `server`: this folder contains mock up JSON.
  * `locale`: this folder contains files for localization.
- `src`: this folder contains all JavaScript source codes.
  * `services`: this folder contains any utilities and services being used by the application.
  * `widgets`: this folder contains the different directives/UI components/UI widgets.
  * `views`: this folder contains views that represent pages (one view per page). With the exception of the main controller - this controller is responsible for managing global aspects of the application and it's view, which is usually the main sturcure of the application, often being described inside the index.html file.
  * `app.module.js`: this file lists all the modules required by the application.
  * `app.routes.js`: this file is using angular-ui-router package to declare all routes for pages in the application.
- `test`: this folder contains files for testing.
  * `spec`: this folder contains spec files to run tests with Jasmine
  * `karma.conf.js`: this file defines configurations for unit testing with Jasmine.
- `app.js`: required by index.html. This file is responsible for loading all app's JS dependencies first (including app.module.js, app.routes.js), then bootstrap the application.
