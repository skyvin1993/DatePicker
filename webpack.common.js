const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader" 
          },  
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: __dirname,
        use: [
          {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              },
          }
        ]
      }
    ]
  },
  plugins: [
        new MiniCssExtractPlugin({
            filename: "Datepicker.css",
        })
    ]
};
