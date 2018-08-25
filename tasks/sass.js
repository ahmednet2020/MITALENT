const sass = require('node-sass');
module.exports = {
    options: {
        implementation: sass,
        sourceMap: true,
        outputStyle:"compressed"
    },
    dist: {
        files: {
            './public/css/index.min.css': './src/sass/index.scss',
            './public/css/news.min.css': './src/sass/news.scss',
            './public/css/clients.min.css': './src/sass/clients.scss'
        }
    }
}