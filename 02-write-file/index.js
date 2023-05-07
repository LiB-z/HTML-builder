const { stdin, stdout} = process;
let fs = require('fs');
let newFile = fs.createWriteStream(`${__dirname}\\text.txt`);

stdout.write('Введите текст для сохранения?\n');
stdin.on('data', data => {
    let text = data.toString();
    if(text.trim() === 'exit') process.exit();
    newFile.write(text);
});
process.on( "SIGINT", function() {
    process.exit();
});
process.on('exit', () => stdout.write(`\n   Вы восхитительны!
    ☆*･｡*.･★*･｡*.･☆   ^     ^
                  乁( =•ㅅ •=乁) \n`));