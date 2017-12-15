const dst = __dirname + '/public/js'

module.exports = {
  entry: './public/js/script.js',
  output: {
    path: dst,
    filename: 'bundle.js',
  }
}
