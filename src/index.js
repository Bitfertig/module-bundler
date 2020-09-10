console.log('It`s working.');

//require('./src/myfile.js'); // Require will also automatically scan node_modules to find modules

import './main.scss';

//import hljs from 'highlight.js'; // all languages
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/scss/vs2015.scss';
//import 'highlight.js/scss/atom-one-dark.scss';


import Vue from 'vue'
import App from './app.vue';
window.vm = new Vue({
    render: h => h(App),
}).$mount('#app');



function generate() {

    let target = document.querySelector('#target').value; // web, node, ...
    let entry = document.querySelector('#entry').value;

    let output_path_type = document.querySelector('[name=output_path_type]:checked').value;
    let output_path = '';
    if ( output_path_type == 'function' ) {
        output_path = document.querySelector('#output_path_function').value;
    }
    else if ( output_path_type == 'string' ) {
        output_path = document.querySelector('#output_path_string').value;
        output_path = `'${output_path}'`;
    }
    let output_filename = document.querySelector('#output_filename').value;

    let features = [];
    features.clean = document.querySelector('#clean').checked;
    features.html = document.querySelector('#html').checked;
    features.css_extract = document.querySelector('#css_extract').checked;
    features.css = document.querySelector('#css').checked;
    features.sass = document.querySelector('#sass').checked;
    features.less = document.querySelector('#less').checked;
    features.babel = document.querySelector('#babel').checked;
    features.vue = document.querySelector('#vue').checked;

    var devInstalls = ['npm install --save-dev webpack webpack-cli'];
    var requires = [];
    var rules = [];
    var plugins = [];


    if ( features.clean ) {
        devInstalls.push('clean-webpack-plugin');
        requires.push(`const { CleanWebpackPlugin } = require('clean-webpack-plugin');`);
        plugins.push(`new CleanWebpackPlugin(),`);
    }
    
    if ( features.html ) {
        devInstalls.push('html-webpack-plugin');
        requires.push(`const HtmlWebpackPlugin = require('html-webpack-plugin');`);
        plugins.push(`
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        `);
    }

    if ( features.css_extract ) {
        devInstalls.push('mini-css-extract-plugin');
        requires.push(`const MiniCssExtractPlugin = require('mini-css-extract-plugin');`);
        plugins.push(`
        new MiniCssExtractPlugin()
        `);
    }

    if ( features.css ) {
        devInstalls.push('css-loader', 'style-loader');
        rules.push(`
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        `);
    }

    if ( features.sass ) {
        devInstalls.push('css-loader', 'sass-loader', 'node-sass', 'style-loader');
        rules.push(`
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        `);
    }

    if ( features.less ) {
        rules.push(`
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        `);
    }

    if ( features.babel ) {
        devInstalls.push('babel-loader', '@babel/core', '@babel/preset-env');
        rules.push(`
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", {
                                    modules: false,
                                }
                            ]
                        ],
                        plugins: [

                        ]
                    }
                }
            },
        `);
    }

    if ( features.vue ) {
        devInstalls.push('vue-loader', 'vue-template-compiler');
        //installs.push('npm install vue'); // TODO:
        requires.push(`const VueLoaderPlugin = require('vue-loader/lib/plugin');`);
        rules.push(`
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
        `);
        plugins.push(`new VueLoaderPlugin(),`);
    }

    
    devInstalls = devInstalls.filter((x, i, a) => a.indexOf(x) == i).join(' ');
    requires = requires.map(item => item.trim('')).join("\n");
    rules = rules.map(item => '            '+item.trim('')).join("\n").trim('');
    plugins = plugins.map(item => '        '+item.trim('')).join("\n").trim('');


    var webpack_config = `
/**
 * Webpack configuration
 * 
 * Installs:
 * npm init -y
 * ${devInstalls}
 */

const webpack = require('webpack');
const path = require('path');
${requires}

const config = {
    target: '${target}',
    entry: {
        main: '${entry}'
    },
    output: {
        path: ${output_path},
        filename: '${output_filename}',
    },
    module: {
        rules: [
            ${rules}
        ]
    },
    plugins: [
        ${plugins}
    ]
};


module.exports = config;
`;

webpack_config = webpack_config.trim();

    document.querySelector('#files').innerText = webpack_config;

    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}



generate();

document.querySelectorAll('.generate').forEach(item => {
    item.addEventListener('change', function(){
        generate();
    });
    
});