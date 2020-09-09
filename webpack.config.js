const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const config = {
    //watch: true,
    /* watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 200, // after build
        poll: 1000 // every
    }, */
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Standard
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            },
            // Running Babel on JS files. https://www.thebasement.be/working-with-babel-7-and-webpack/
			/* {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
                        presets: [
                            [
                                "@babel/preset-env", {
                                    "useBuiltIns": "usage",
                                    "debug": true
                                }
                            ]
                        ],
                        plugins: [
                            //'lodash',
                            '@babel/plugin-transform-runtime'
                        ]
					}
				}
            }, */
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                //exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'css',
                            name: '[name].min.css'
                        }
                    },
                    /* {
                        loader: 'style-loader', // inject CSS to page
                    }, */
                    {
						loader: 'extract-loader'
					},
                    {
                        loader: 'css-loader?-url', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    },
                    
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ]
};


module.exports = config;