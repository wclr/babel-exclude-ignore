var opts
var excludeIgnore = require('./index')

try {  
  var pkg = require(process.cwd() + '/package.json')
  opts = pkg.babelExcludeIgnore || pkg.excludeIgnore    
} catch(e){}

if (opts){  
  require('babel-core/register')({
    ignore: excludeIgnore(opts)
  })  
}
