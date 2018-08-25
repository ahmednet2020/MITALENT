module.exports = {
    options: {
      map: true, // inline sourcemaps
      processors: [
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
      ]
    },
    dist: {
      src: ['./public/css/index.min.css','./public/css/news.min.css']
    }
}
