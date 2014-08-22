module.exports = function (grunt) {
  var fileblocks = {
    frameworks: {
      src: [
        'client/bower_components/jquery/dist/jquery.js',
        'client/bower_components/angularjs/angular.js',
        'client/bower_components/lodash/dist/lodash.js'
      ],
      cwd: 'app'
    }
  };

  grunt.initConfig({
    pkg: grunt.file.read('package.json'),
    
    fileblocks: {
      options: {
        removeFiles: true,
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json'],
        // createTag: true,
        // tagName: '%VERSION%',
        // tagMessage: 'Version %VERSION%',
        // push: true,
        // pushTo: 'upstream',
        // gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },

    watch: {
      fileblocks: {
        files: ['app/client/*/index.html', 'app/client/**/*.js'],
        tasks: ['setup_fileblocks', 'fileblocks']
      }
    }
  });

  grunt.registerTask('setup_fileblocks', function () {
    var files = grunt.file.expand('app/client/*/index.html');
    files.forEach(function (file) {
      var name = file.match(/([^\/]+)\/index\.html$/)[1];
      if (name) {
        if (!fileblocks[name]) {
          fileblocks[name] = {
            src: [['client', name, '**/*.js'].join('/')],
            cwd: 'app'
          };
        }
        if (!grunt.config.data.fileblocks[name]) {
          grunt.config.data.fileblocks[name] = {
            src: file,
            blocks: fileblocks
          };
        }
      }
    });
  })
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-file-blocks');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['setup_fileblocks', 'fileblocks']);
};