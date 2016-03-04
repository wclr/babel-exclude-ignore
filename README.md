### babel-exclude-ignore

By default babel transform ignores evertying in `node_modules`. 
This module allows to include some modules (folders) from project's `node_modules`.

```js
var excludeIgnore = require('babel-exclude-ignore')
require('babel-core/register')({
  ignore: excludeIgnore(["my-module"], true)
  // the same as:
  // ignore: excludeIgnore({"modules": ["bbooks-shared"], "debug": true})
})
// note that it will still ignore nested `/my-modules/node_modules/**` files
```

You can also use another workflow:
1) define in project's `package.json` `babelExcludeIgnore` (or `excludeIgnore`) section:
```json
  "babelExcludeIgnore": {
    "modules": ["my-module", "another-module"], "debug": true
  }
```
and then: 
```js
require('babel-exclude-ignore/register')
```
it will read `package.json` and register `ignore`.