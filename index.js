'use strict'

var minimatch = require('minimatch')

var excludeIgnore = (modules, debug) => {    
  debug = modules.debug !== undefined 
    ? modules.debug : (debug || false)
  modules = modules.modules || modules    
  debug &&  console.warn('[babelExcludeIgnore] debug mode')
  if (!Array.isArray(modules)){
    throw(new Error('"modules" to excluded should be array of strings'))
  }
  var excludeModule = (module, filename)  => {
    if (minimatch(filename, `**/${module}/node_modules/**`)) {
      return true
    } else if (minimatch(filename, `**/${module}/**`)) {
      debug &&  console.warn('[babelExcludeIgnore]', filename)
      return false
    } else if (minimatch(filename, '**/node_modules/**')){
      return true
    }
    debug &&  console.warn('[babelExcludeIgnore]', filename)
    return false
  }
  return (filename)  =>  {
    return !modules.reduce((excluded, m) => {
      return excluded || !excludeModule(m, filename)
    }, false)
  }
}

module.exports = excludeIgnore