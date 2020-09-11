<template>
    <div class="grid-container">

        <div class="in">

            <form @change="generate()">
            
                <h1>webpack Generator</h1>

                <div class="box">
                    Target:
                    <select name="target" id="target" v-model="target">
                        <option value="web">web</option>
                        <option value="node">node</option>
                    </select>
                </div>

                <div class="box">
                    Entry: <input type="text" name="entry" id="entry" v-model="entry">
                </div>

                <div class="box">
                    Output path:
                    <input type="radio" name="output_path_type" id="output_path_type_function" value="function" v-model="output_path_type"> <input type="text" id="output_path_function" v-model="output_path_function">
                    <input type="radio" name="output_path_type" id="output_path_type_string" value="string" v-model="output_path_type"> <input type="text" id="output_path_string" v-model="output_path_string">
                </div>

                <div class="box">
                    Output filename: <input type="text" id="output_filename" v-model="output_filename">
                </div>

                <div class="box">
                    Features
                    <ul id="">
                        <li><input type="checkbox" id="clean" value="1" v-model="features.clean"> <label for="clean">Cleanup</label></li>
                        <li><input type="checkbox" id="html" value="1" v-model="features.html"> <label for="html">HTML</label></li>
                        <li><input type="checkbox" id="css_extract" value="1" v-model="features.css_extract"> <label for="css_extract">CSS Extract</label></li>
                        <li><input type="checkbox" id="css" value="1" v-model="features.css"> <label for="css">CSS</label></li>
                        <li><input type="checkbox" id="sass" value="1" v-model="features.sass"> <label for="sass">SASS</label></li>
                        <li><input type="checkbox" id="less" value="1" v-model="features.less"> <label for="less">Less</label></li>
                        <li><input type="checkbox" id="babel" value="1" v-model="features.babel"> <label for="babel">Babel</label></li>
                        <li><input type="checkbox" id="vue" value="1" v-model="features.vue"> <label for="vue">Vue</label></li>
                    </ul>
                </div>

            </form>

            <div class="footer">
                <a href="http://www.bitfertig.de/impressum">Impress</a>
                &middot;
                <a href="http://www.bitfertig.de/datenschutzerklaerung">Privacy</a>
            </div>

        </div>


        <div class="out">

            webpack.config.js
            <!-- <highlightjs language='javascript' code="var x = 5;" /> -->
            <pre><code v-html="webpack_config"></code></pre>

        </div>

    </div>
</template>

<script>

import hljs from 'highlight.js'; // all languages
//import hljs from 'highlight.js/lib/core';
//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);
import 'highlight.js/scss/vs2015.scss';
//import 'highlight.js/scss/atom-one-dark.scss';

var beautify = require('js-beautify').js;

export default {
    components: {
        //highlightjs
    },
    data: function() {
        return {
            target: 'web',
            entry: 'src/index.js',
            output_filename: 'bundle.js',
            output_path_type: 'function', // document.querySelector('[name=output_path_type]:checked').value;
            output_path_function: `path.resolve(__dirname, 'dist')`, 
            output_path_string: './dist',
            output_filename: 'bundle.js',// document.querySelector('#output_filename').value;
            features: {
                clean: false,
                html: false,
                css_extract: false,
                css: false,
                sass: false,
                less: false,
                babel: false,
                vue: false,
            },

            //devInstalls: [],
            //requires: [],
            //rules: [],
            //plugins: [],

            webpack_config: '',
        }
    },
    mounted () {
        console.log('mounted');
    },
    computed: {
        output_path: function() {
            var output_path = ''
            if ( this.output_path_type == 'function' ) {
                output_path = this.output_path_function;
            }
            else if ( this.output_path_type == 'string' ) {
                output_path = this.output_path_string;
                output_path = `'${output_path}'`;
            }
            return output_path;
        },
    },
    methods: {
        generate: function(){
            console.log('generate');


            var devInstalls = ['webpack', 'webpack-cli']
            var requires = [];
            var target = this.target;
            var entry = this.entry;
            var output_path = this.output_path;
            var output_filename = this.output_filename;
            var rules = [];
            var plugins = [];


            if ( this.features.clean ) {
                devInstalls.push('clean-webpack-plugin');
                requires.push(`const { CleanWebpackPlugin } = require('clean-webpack-plugin');`);
                plugins.push(`new CleanWebpackPlugin(),`);
            }
            
            if ( this.features.html ) {
                devInstalls.push('html-webpack-plugin');
                requires.push(`const HtmlWebpackPlugin = require('html-webpack-plugin');`);
                plugins.push(`
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: 'index.html',
                }),
                `);
            }

            if ( this.features.css_extract ) {
                devInstalls.push('mini-css-extract-plugin');
                requires.push(`const MiniCssExtractPlugin = require('mini-css-extract-plugin');`);
                plugins.push(`
                new MiniCssExtractPlugin()
                `);
            }

            if ( this.features.css ) {
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

            if ( this.features.sass ) {
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

            if ( this.features.less ) {
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

            if ( this.features.babel ) {
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

            if ( this.features.vue ) {
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
            rules = rules.map(item => item.trim('')).join("\n").trim('');
            plugins = plugins.map(item => item.trim('')).join("\n").trim('');


            var webpack_config = `
/**
 * Webpack configuration
 * 
 * Installs:
 * npm init -y
 * npm install --save-dev ${devInstalls}
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

            webpack_config = beautify(webpack_config, { indent_size: 2, space_in_empty_paren: true });
            webpack_config = hljs.highlightAuto( webpack_config ).value;

            this.webpack_config = webpack_config;

        },
    },
}
</script>

<style>
body {border:10px solid red;}
</style>