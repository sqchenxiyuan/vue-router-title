const fs = require('fs'),
      path = require('path'),
      webpack = require('webpack');

module.exports = {
    devtool:'eval-source-map',

    entry:{
        "title-change":path.resolve(__dirname, './title-change/app.js'),
        "function":path.resolve(__dirname, './function/app.js')
    },

    output:{
        path:path.join(__dirname, '__build__'),
        filename:'[name].js',
        chunkFilename:'[id].chunk.js',
        publicPath:'/build/'
    },

    module: {
        rules: [
            { test:/\.js$/, exclude:/node_modules/, loader:'babel-loader' },
            { test:/\.vue$/, loader:'vue-loader' }
        ]
    },

    resolve:{
        alias:{
            'vue':'vue/dist/vue.common.js',
            'vue-router-title':path.resolve(__dirname,'../src/index.js')
        }
    },

    devServer:{
        hot:true,
        contentBase:__dirname,
        port:3000,
        historyApiFallback:true,
    },

}