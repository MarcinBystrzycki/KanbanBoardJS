module.exports = function(grunt) {

	grunt.initConfig ({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'css/style.css': 'sass/style.sass'
				}
			}
		},

		watch: {
			scripts: {
				files: ['sass/*.sass'],
				tasks: ['sass'],
				options: {
					spawn: false,
				},
			}
		}			
	});
	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ["sass", "watch"]);
};