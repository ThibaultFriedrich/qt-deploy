# qt-deploy
Module to easily add dll to qt executable

For now, it manages :

* qt with MSVC 2010 on windows

## Install

```javascript
npm install qt-deploy
```

## Getting started

Setup the environment variables for MSVC 2010

* JOM_PATH

```javascript
var qtDeploy = require('qt-deploy');
qtDeploy({
    exec: '<path to executable>',
    verbose: true, // default is false
    debug: true // default is false
}, function (err) {

});

```
