let fs = require('fs');
let path = require('path');
fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8').on('data', data => console.log(data));