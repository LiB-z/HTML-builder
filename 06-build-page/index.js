const fs = require('fs');
const path = require('path');
const pr = require('fs/promises');
const styleDir = path.join(__dirname,'styles');
const ProjectDir = path.join(__dirname,'project-dist');
const componDir = path.join(__dirname,'components');
const templateDir = path.join(__dirname,'template.html');
let template = '';

fs.rm(ProjectDir, {force: true, recursive :true},() => {createPage()});
function createPage() {
    let createProjectFolder = new Promise((resolve) => {
        fs.mkdir(path.join(__dirname,'project-dist'), true,(err,data) => resolve())
    });

    fs.mkdir(path.join(__dirname,'project-dist'), true,(err,data) => {});

    console.log("add assets");
    (function copyDir (origDirectory = __dirname, newDirectory = ProjectDir, newFolder = 'assets', origFolder = 'assets') {
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
    })();

    console.log("add style");
    (() => {
        let StyleFile = fs.createWriteStream(`${ProjectDir}\\style.css`);
        let files = new Promise((resolve) => {
            fs.readdir(styleDir,(err,data) => resolve(data));
        })
        files.then((fileList) => {
            fileList.map(file => {
                const fileFormat = path.extname(file).slice(1);
                fs.stat(path.join(styleDir, file), (err,elem) => {
                    if(!elem.isDirectory() && fileFormat === 'css') {
                        fs.createReadStream(path.join(styleDir,file), 'utf-8').on('data', param => {
                            StyleFile.write(param.toString());
                        });
                    }
                });
            })
        });
    })();

    console.log("read template/components");
    (async () => {
        await fs.createReadStream(templateDir, 'utf-8').on('data', data => {
            template = data;
        });
        const componentList = await pr.readdir(componDir, (data) => {});
        await Promise.all(componentList.map((component) => {
            return new Promise(async (r) => {
                const componentName = component.slice(0,component.indexOf('.'));
                const componentData = await pr.readFile(`${componDir}/${component}`, 'utf-8');
                template = template.replace(`{{${componentName}}}`, componentData);
                r();
            });
        }));
        console.log("create index")
        const ProjectHMTL = fs.createWriteStream(path.join(ProjectDir, 'index.html')).write(template);
    })();
}