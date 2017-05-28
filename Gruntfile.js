'use strict';
/* jshint esversion: 6 */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    jshint: {files: ['mraidReady.js']},
    uglify: {
      options: {compress: {drop_console: true}},
      default: {files: {'mraidReady.min.js': 'mraidReady.js'}}
    }
  });

  grunt.registerTask('build', ['jshint', 'uglify']);
};