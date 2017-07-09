module.exports = {
  test: /\.(js|jsx)?(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: ['react-hmre'],
    plugins: [
        'transform-runtime',
    ]
  }
}
