var path = require('path');
var root = path.resolve(__dirname, '..');


module.exports = {
  sourceRoot: path.resolve(root, 'src'),
  source: path.resolve(root, 'src') + '/**/*.js',
  dest: path.resolve(root, 'dest'),
  files: path.resolve(root, 'dest') + '/**/*.js',
  doc: path.resolve(root, 'doc'),
  test: {
    sourceRoot: path.resolve(root, 'test', 'src'),
    source: path.resolve(root, 'test', 'src') + '/**/*.js',
    dest: path.resolve(root, 'test', 'dest'),
    files: path.resolve(root, 'test', 'dest') + '/**/*.spec.js',
  }
};
