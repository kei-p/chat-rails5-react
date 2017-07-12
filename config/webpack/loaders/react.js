const { env } = require('process')

let settings = {
  test: /\.(js|jsx)?(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
}

if ( env.NODE_ENV == 'development' ) {
  settings.options =  {
    presets: ['react-hmre']
  }
}

module.exports = settings;
