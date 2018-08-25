module.exports = {
	css:{
		files: './src/sass/**/*.scss',
	    tasks: ['sass', 'postcss'],
	    options: {
	      debounceDelay: 250,
	    },
	},
	pug:{
		files: './src/pug/**/*.pug',
	    tasks: ['pug'],
	    options: {
	      debounceDelay: 250,
	    },
	},
	js:{
		files: './src/js/**/*.js',
	    tasks: ['babel'],
	    options: {
	      debounceDelay: 250,
	    },
	}

}