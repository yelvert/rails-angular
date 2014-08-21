module.exports = function (grunt) {
  var fileblocks = {
    frameworks: {
      src: [
        'client/bower_components/jquery/dist/jquery.js',
        'client/bower_components/angularjs/angular.js',
        'client/bower_components/lodash/dist/lodash.js'
      ],
      cwd: 'app'
    },
    home: {
      src: ['home/*.js'],
      cwd: 'app'
    }
  };

  grunt.initConfig({
    pkg: grunt.file.read('package.json'),
    
    fileblocks: {
      options: {
        removeFiles: true,
      },
      main: {
        src: 'app/views/home/_client.html.erb',
        blocks: fileblocks
      }
    },

    watch: {
      fileblocks: {
        files: ['app/views/**/_client.html.erb', 'app/client/**/*.js'],
        tasks: ['fileblocks']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-file-blocks');

  grunt.registerTask('default', ['fileblocks:main']);
};