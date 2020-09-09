<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module Bundler</title>
</head>
<body>
    
    <h1>Webpack Generator</h1>

    Entry: <input type="text" id="entry" value="src/index.js">
    Output: <input type="text" id="output" value="dist/bundle.js">

    <ul id="">
        <li><input type="checkbox" id="sass"> SASS</li>
        <li><input type="checkbox" id="babel"> Babel</li>
        <li><input type="checkbox" id="vue" value="1" onchange="generate()"> Vue</li>
    </ul>

    <textarea id="files" rows="20" style="width:100%;"></textarea>

    <div id="install"></div>


    <script src="main.js"></script>

</body>
</html>