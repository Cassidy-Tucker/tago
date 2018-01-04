const dst = __dirname + '/frontend/public/js'

module.exports = {
  entry: dst + '/script.js',
  output: {
    path: dst,
    filename: 'bundle.js',
  }
}
