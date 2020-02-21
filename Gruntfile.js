module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        build: {
          src: 'src/*.js',
          dest: 'dist/one-drive-picker.min.js'
        }
      }
    //   ,
    //   css: {
    //     build: {
    //       src: 'src/*.css',
    //       dest: 'dist/app.min.css'
    //     }
    //   },
    //   html: {
    //     build: {
    //       src: 'src/*.htm',
    //       dest: 'dist/*.htm'
    //     }
    //   }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

  
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
  
};