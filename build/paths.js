var path = require('path');
var root = path.resolve(__dirname, '..');

module.exports = {
  sourceRoot: path.resolve(root, 'src'),
  source: path.resolve(root, 'src') + '/**/*.js',
  dest: path.resolve(root, 'dist'),
  files: path.resolve(root, 'dist') + '/**/*.js',
  doc: path.resolve(root, 'doc'),
  test: {
    sourceRoot: path.resolve(root, 'test', 'src'),
    source: path.resolve(root, 'test', 'src') + '/**/*.js',
    dest: path.resolve(root, 'test', 'dist'),
    files: path.resolve(root, 'test', 'dist') + '/**/*.spec.js',
  }
};
