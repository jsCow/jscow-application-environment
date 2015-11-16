module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		taget: 'dist/',
		theme: 'node_modules/jscow-theme/src/less/theme.less',
		
		// Permission problem try to exec command "npm cache clean"
		watch: {
            less: {
                files: [
					'src/less//{,*/}*.less',
					'/{,*/}*.js'
				],
                tasks: [
					'clean',
					'less',
					'concat',
					'uglify'
					/*,
					'yuidoc'*/
				]
            }
        },
		
		clean: {
			clean: [
				"dist"
			]
		},
		
		less: {
			production: {
				options: {
					//relativeUrls: true,
					paths: ["src/less"],
					cleancss: true,
					modifyVars: {
						//imgPath: '"http://"'
					}
				},
				files: {
					"<%= target %>/css/theme-min.css": "<%= theme %>"
				}
			}
		},
		
		copy: {
			main: {
				files: [
					{
						expand: true, 
						cwd: 'src/jscow/components', 
						src: '**/*.js',
						dest: 'dist/jscow/components'
					},
					{
	                    expand: true,
	                    //dot: true,
	                    cwd: 'node_modules/font-awesome',
	                    src: ['fonts/*.*'],
	                    dest: 'dist'
					},
					{
	                    expand: true,
	                    //dot: true,
	                    cwd: 'src/less',
	                    src: ['**'],
	                    dest: 'dist/css/less'
					}
				]
			}
		},
		
		uglify: {
			options: {
				mangle: {
					except:	['jQuery']
				}
			},
			my_target: {
				options: {
					mangle: false
				},
				files: [
					{
						expand: true,
						cwd: 'src/jscow/components',
						src: '**/*.js',
						dest: 'dist/jscow/components'
					},
					{
						'dist/jscow/jscow.min.js': ['dist/jscow/jscow.min.js']
					}
				]
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'src/jscow/jscow.js', 
					'src/jscow/jscow.components.js', 
					'src/jscow/jscow.components.view.js', 
					'src/jscow/jscow.components.controller.js', 
					'src/jscow/jscow.events.js'
				],
				dest: 'dist/jscow/jscow.min.js'
			}
		},
		
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				maxparams: 4,
				notypeof: true,
				globals: {
					jQuery: true
				}
			},
			all: ['src/jscow/**/*.js']
		},

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/jscow/',
					outdir: 'dist/docs/'
				}
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Default task(s).
	grunt.registerTask('default', [
		//'jshint',
		'clean',
		'less',
		//'concat',
		//'copy',
		//'uglify',
		//'yuidoc'
	]);

};
