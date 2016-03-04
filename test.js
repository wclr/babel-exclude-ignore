'use strict'

var exclude = require('./index')

var ignoreFn = exclude(["excludedModuleX", "excludedModuleY"])

var test = (testName, filename, result) => {
  if (ignoreFn(filename) === result){
    console.log(testName + ' passed')    
  } else {
    throw(testName + ' is not passed')
  } 
}

test('project file should NOT be ignored', '//code/app/module.js', false)

test('files inside node_modules should be ignored', 
  '//code/app/node_modules/module.js', true)
test('nested files inside node_modules should be ignored', 
  '//code/app/node_modules/nested/module.js', true)

test('files inside node_modules/excludedModuleX should NOT be ignored', 
  '//code/app/node_modules/excludedModuleX/module.js', false)

test('nested files inside node_modules/excludedModuleY should NOT be transformed',
  '//code/app/node_modules/excludedModuleY/nested/module.js', false)

test('files inside node_modules/excludedModuleX should be ignored',
  '//code/app/node_modules/excludedModuleX/node_modules/module.js', true)

console.log('TESTS PASSED')