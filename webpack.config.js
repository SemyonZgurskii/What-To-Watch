const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  module: {
    rules: [
      {
        type: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }, {
        type: /\.(ts|tsx)$/,
        loader: `ts-loader`
      }
    ]
  },
  devtool: `source-map`
};


