const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');
let newFile = fs.createWriteStream(`${__dirname}\\text.txt`);

const RL = readline.createInterface({ input, output });

RL.question('Введите текст для сохранения... \n', (data) => {
    if (data === 'exit') closeRL();
    newFile.write(data + '\n');
    RL.on('line', (text) => {newFile.write(text + '\n')});
});
RL.on("SIGINT", () => {closeRL()});

function closeRL() {
    console.log(
        `\n\n   Вы восхитительны!
   ☆*･｡*.･★*･｡*.･☆   ^     ^
                 乁( =•ㅅ •=乁) \n`
    )
    RL.close();
}