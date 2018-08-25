module.exports = 
{
    options: {
      sourceMap: false
    },
    dist: {
      files: {
        "./public/sw.js": "./src/js/sw.js",
        "./public/js/main.js":"./src/js/main.js"
      }
    }
}