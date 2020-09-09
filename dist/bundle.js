/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('It`s working.'); //require('./src/myfile.js'); // Require will also automatically scan node_modules to find modules\n\nfunction generate() {\n  let target = document.querySelector('#target').value; // web, node, ...\n\n  let entry = document.querySelector('#entry').value;\n  let output_path_type = document.querySelector('[name=output_path_type]:checked').value;\n  let output_path = '';\n\n  if (output_path_type == 'function') {\n    output_path = document.querySelector('#output_path_function').value;\n  } else if (output_path_type == 'string') {\n    output_path = document.querySelector('#output_path_string').value;\n    output_path = `'${output_path}'`;\n  }\n\n  let output_filename = document.querySelector('#output_filename').value;\n  let features = [];\n  features.clean = document.querySelector('#clean').checked;\n  features.html = document.querySelector('#html').checked;\n  features.css_extract = document.querySelector('#css_extract').checked;\n  features.css = document.querySelector('#css').checked;\n  features.sass = document.querySelector('#sass').checked;\n  features.babel = document.querySelector('#babel').checked;\n  features.vue = document.querySelector('#vue').checked;\n  var devInstalls = ['npm install --save-dev webpack webpack-cli'];\n  var requires = [];\n  var rules = [];\n  var plugins = [];\n\n  if (features.clean) {\n    devInstalls.push('clean-webpack-plugin');\n    requires.push(`const { CleanWebpackPlugin } = require('clean-webpack-plugin');`);\n    plugins.push(`new CleanWebpackPlugin(),`);\n  }\n\n  if (features.html) {\n    devInstalls.push('html-webpack-plugin');\n    requires.push(`const HtmlWebpackPlugin = require('html-webpack-plugin');`);\n    plugins.push(`\n        new HtmlWebpackPlugin({\n            template: './src/index.html',\n            filename: 'index.html',\n        }),\n        `);\n  }\n\n  if (features.css_extract) {\n    devInstalls.push('mini-css-extract-plugin');\n    requires.push(`const MiniCssExtractPlugin = require('mini-css-extract-plugin');`);\n    plugins.push(`\n        new MiniCssExtractPlugin()\n        `);\n  }\n\n  if (features.css) {\n    devInstalls.push('css-loader', 'style-loader');\n    rules.push(`\n            {\n                test: /\\.css$/,\n                use: [\n                    'style-loader',\n                    'css-loader',\n                ]\n            },\n        `);\n  }\n\n  if (features.sass) {\n    devInstalls.push('css-loader', 'sass-loader', 'node-sass', 'style-loader');\n    rules.push(`\n            {\n                test: /\\.scss$/,\n                use: [\n                    'style-loader',\n                    'css-loader',\n                    'sass-loader',\n                ]\n            },\n        `);\n  }\n\n  if (features.babel) {\n    devInstalls.push('babel-loader', '@babel/core', '@babel/preset-env');\n    rules.push(`\n            {\n                test: /\\.js$/,\n                exclude: /node_modules/,\n                use: {\n                    loader: 'babel-loader',\n                    options: {\n                        presets: [\n                            [\n                                \"@babel/preset-env\", {\n                                    modules: false,\n                                }\n                            ]\n                        ],\n                        plugins: [\n\n                        ]\n                    }\n                }\n            },\n        `);\n  }\n\n  if (features.vue) {\n    devInstalls.push('vue-loader', 'vue-template-compiler');\n    requires.push(`const VueLoaderPlugin = require('vue-loader/lib/plugin');`);\n    rules.push(`\n            {\n                test: /\\.vue$/,\n                use: [\n                    'vue-loader'\n                ]\n            },\n        `);\n    plugins.push(`new VueLoaderPlugin(),`);\n  }\n\n  devInstalls = devInstalls.filter((x, i, a) => a.indexOf(x) == i).join(' ');\n  requires = requires.map(item => item.trim('')).join(\"\\n\");\n  rules = rules.map(item => item.trim('')).join(\"\\n\");\n  plugins = plugins.map(item => item.trim('')).join(\"\\n\");\n  var webpack_config = `\n/**\n * Webpack configuration\n * \n * Installs:\n * npm init -y\n * ${devInstalls}\n */\n\nconst webpack = require('webpack');\nconst path = require('path');\n${requires}\n\nconst config = {\n    target: '${target}',\n    entry: {\n        main: '${entry}'\n    },\n    output: {\n        path: ${output_path},\n        filename: '${output_filename}',\n    },\n    module: {\n        rules: [\n            ${rules}\n        ]\n    },\n    plugins: [\n        ${plugins}\n    ]\n};\n\n\nmodule.exports = config;\n`;\n  webpack_config = webpack_config.trim();\n  document.querySelector('#files').value = webpack_config;\n}\n\ngenerate();\ndocument.querySelectorAll('.generate').forEach(item => {\n  item.addEventListener('change', function () {\n    generate();\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });