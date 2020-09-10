<template>
    <div class="grid-container">

        <div class="in">
            <h1>webpack Generator</h1>

            <div class="box">
                Target:
                <select name="target" id="target" class="generate" v-model="target">
                    <option value="web">web</option>
                    <option value="node">node</option>
                </select>
            </div>

            <div class="box">
                Entry: <input type="text" name="entry" id="entry" class="generate" v-model="entry">
            </div>

            <div class="box">
                Output path:
                <input type="radio" name="output_path_type" id="output_path_type_function" class="generate" value="function" checked> <input type="text" id="output_path_function" class="generate" value="path.resolve(__dirname, 'dist')">
                <input type="radio" name="output_path_type" id="output_path_type_string" class="generate" value="string"> <input type="text" id="output_path_string" class="generate" value="./dist">
            </div>

            <div class="box">
                Output filename: <input type="text" id="output_filename" class="generate" v-model="output_filename">
            </div>

            <div class="box">
                Features
                <ul id="">
                    <li><input type="checkbox" id="clean" class="generate" value="1"> <label for="clean">Cleanup</label></li>
                    <li><input type="checkbox" id="html" class="generate" value="1"> <label for="html">HTML</label></li>
                    <li><input type="checkbox" id="css_extract" class="generate" value="1"> <label for="css_extract">CSS Extract</label></li>
                    <li><input type="checkbox" id="css" class="generate" value="1"> <label for="css">CSS</label></li>
                    <li><input type="checkbox" id="sass" class="generate" value="1"> <label for="sass">SASS</label></li>
                    <li><input type="checkbox" id="less" class="generate" value="1"> <label for="less">Less</label></li>
                    <li><input type="checkbox" id="babel" class="generate" value="1"> <label for="babel">Babel</label></li>
                    <li><input type="checkbox" id="vue" class="generate" value="1"> <label for="vue">Vue</label></li>
                </ul>
            </div>


            <div class="footer">
                <a href="http://www.bitfertig.de/impressum">Impress</a>
                &middot;
                <a href="http://www.bitfertig.de/datenschutzerklaerung">Privacy</a>
            </div>

        </div>


        <div class="out">

            webpack.config.js
            <pre><code class="language-js" id="files"></code></pre>

        </div>

    </div>
</template>

<script>
export default {
    data: function(){
        return {
            target: 'web',
            entry: 'src/index.js',
            output_filename: 'bundle.js',
        }
    },
    mounted () {
        console.log('mounted');
    },
    computed: {

    },
    methods: {

    },
}
</script>

<style>
body {border:10px solid red;}
</style>