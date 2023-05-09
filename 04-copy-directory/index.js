const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'file-copy'), {force: true, recursive :true},() => copyDir());

function copyDir (origDirectory =__dirname, newDirectory =__dirname, newFolder = 'file-copy', origFolder = 'files') {
    fs.mkdir(path.join(newDirectory, newFolder), true,(err,data) => {
        fs.readdir(path.join(origDirectory, origFolder), (err,data) => {
            data.forEach((file) => {
                fs.stat(path.join(origDirectory,origFolder,file),(err,data) => {
                    if(data.isDirectory()) {
                        copyDir(path.join(origDirectory,origFolder),path.join(newDirectory,newFolder),file,file)
                    };
                    fs.copyFile(path.join(origDirectory,origFolder,file), path.join(newDirectory,newFolder,file), (err,data) => {
                    });
                });
            });
        });
    });
}
