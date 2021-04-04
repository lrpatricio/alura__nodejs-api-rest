const fs = require('fs')

fs.readFile('./assets/img/shitzu.png', (erro, buffer) => {
    console.log('Imagem foi bufferizada')
    console.log(erro);
    console.log(buffer);

    fs.writeFile('./assets/shitzu.png', buffer, erro => {
        console.log('Imagem foi escrita')
    })
})