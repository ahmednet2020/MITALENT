module.exports = {
  compile: {
    options: {
      data: {
        debug: true
      },
      pretty:true
    },
    files: {
      './public/index.html': './src/pug/index.pug',
      './public/news.html': './src/pug/news.pug',
      './public/clients.html': './src/pug/clients.pug'
    }
  }
}