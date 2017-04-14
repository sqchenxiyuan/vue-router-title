let path = require('path'),
    webpack = require('webpack'),
    entrysPath = path.join(__dirname, '../src/entrys/');

module.exports = {
    devtool:'source-map',
    entry:path.resolve(__dirname, '../src/index.js'),
    output:{
        path:path.resolve(__dirname, '../dist'),
        publicPath:'/',
        filename:'[name].js',
    },
    module:{
        loaders:[
          {
            test:/\.js$/,
            loader:'babel-loader?cacheDirectory',
            exclude:/node_modules/
          }
        ]
    },
    devServer:{
        hot:true,
        contentBase:path.resolve(__dirname, '../server/public'),
        port:3000,
        historyApiFallback:true,
    },
};
