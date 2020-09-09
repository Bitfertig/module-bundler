function generate() {


    var installs = ['npm i webpack webpack-cli'];
    var requires = [];
    var entry = '';
    var rules = [];
    var plugins = [];

    if ( document.querySelector('#vue').checked ) {
        installs.push('vue-loader', 'vue-template-compiler');
        requires.push(`const VueLoaderPlugin = require('vue-loader/lib/plugin');`);
        rules.push(`{
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },`);
        plugins.push(`new VueLoaderPlugin(),`);
    }


    installs = installs.join(' ');
    requires = requires.join("\n");
    rules = rules.join("\n");
    plugins = plugins.join("\n");

    var webpack_config = `
/**
 * Webpack configuration
 * 
 * Installs:
 * ${installs}
 */

const webpack = require('webpack');
const path = require('path');
${requires}

const config = {
    entry: {
        main: '${entry}'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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

    document.querySelector('#files').value = webpack_config;
}

generate();