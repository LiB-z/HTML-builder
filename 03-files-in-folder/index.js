const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, "secret-folder"), (err,data) => {
    data.forEach((file) =>{
       fs.stat(path.join(__dirname, "secret-folder", file),(err,elem) => {
            if(elem.isDirectory()) return;
            const fileName = file.slice(0,file.indexOf('.'));
            const fileFormat = path.extname(file).slice(1);
            fs.stat(path.join(__dirname, "secret-folder", file), (err,elem) => {
                const fileSize = (elem.size/1000).toFixed(2);
                return console.log(`${fileName} - ${fileFormat} - ${fileSize}kb\n`)
            });
        });
    });
});