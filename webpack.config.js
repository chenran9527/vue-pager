var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require("webpack");
module.exports =
    {
        entry:
            {
                //入口文件
                "index":__dirname+'/src/main.js',
            },
        output: {
            path: __dirname+'/dist/',  //输出文件夹
            publicPath: '/dist/',
            filename: 'build.js'
        },
        resolve: {
             alias: {'vue$': 'vue/dist/vue.esm.js'},
         },
        externals: {

        },
        module:{
            loaders:[
                {test:/\.js$/,exclude: /^node_modules$/,loader:"babel-loader"},
                //这里肯定要加入n个loader 譬如vue-loader、babel-loader、css-loader等等
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    use: ['vue-loader'],
                }
            ]
        },
    }