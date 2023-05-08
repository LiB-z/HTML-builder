const fs = require('fs');
let path = require('path');
const styleDir = path.join(__dirname,'styles');
const BundleDir = path.join(__dirname,'project-dist','bundle.css');

fs.unlink(BundleDir, () => createBundle());

function createBundle() {
    let Bundle = fs.createWriteStream(`${BundleDir}`);

    let files = new Promise((resolve) => {
        fs.readdir(styleDir,(err,data) => resolve(data));
    })

    files.then((fileList) => {
        fileList.map(file => {
            const fileFormat = path.extname(file).slice(1);
            fs.stat(path.join(styleDir, file), (err,elem) => {
                if(!elem.isDirectory() && fileFormat === 'css') {
                    fs.createReadStream(path.join(styleDir,file), 'utf-8').on('data', param => {
                        Bundle.write(param.toString());
                    });
                }
            });
        })
    });
}