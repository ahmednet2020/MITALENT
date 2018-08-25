const sass = require('./tasks/sass');
const postcss = require('./tasks/postcss');
const pug = require('./tasks/pug');
const watch = require('./tasks/watch');
const babel = require('./tasks/babel');
'use strict';  
module.exports = function(grunt) {
  //load all grunt plugin
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass,
    postcss,
    pug,
    babel,
    watch
})
  //run Tasks
  grunt.registerTask('default', ['sass','postcss','pug','babel','watch']);
};