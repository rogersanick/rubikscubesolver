var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: {
    app: `${SRC_DIR}/index.jsx`,
    minimaxSolver: `${SRC_DIR}/rubiksHelpers/minimaxSolver.js`
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR
  }, 
  module : {
    rules : [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2'],
        },
      }, 
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }

    ]
}
};