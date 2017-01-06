/**
* @Author: Patrick Wertal <wertalp>
* @Date:   12-Dec-2015
* @Email:  patrick.wertal@gmail.com
* @Last modified by:   wertalp
* @Last modified time: 05-Jan-2017
* @License: Licenced by PW @2016
*/



module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
        'source/js/libs/*.js',
        'source/js/global.js'
        ],
        dest: 'source/js/build/main.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/js/main.min.js': ['source/js/build/main.js']
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['source/less']
        },
        files: {
          'public/css/theme.css': 'source/less/theme.less'
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'public/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 3 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
          files: {
              'public/css/theme.min.css': 'public/css/theme.css'
          }
      }
    },

    watch: {
      scripts: {
        files: ['source/js/global.js'],
        tasks: ['concat','uglify'],
        options: {
          spawn: false,
        }
      },

      css: {
        files: ['source/less/**/*.less'],
        tasks: ['less','postcss'],
        options: {
          spawn: false,
        }
      },
    },

    browserSync: {

      dev: {

        bsFiles: {
          src: ["public/css/*.css", "public/*.html", "public/js/*.js"]
        },
        options: {
          watchTask: true, // < VERY important
          ui: {
              port: 9244
          },

          server: {
            baseDir: "./public"
          },
          ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
          }
        }
      }
    },
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat','uglify','less','postcss','browserSync', 'watch']);
};
