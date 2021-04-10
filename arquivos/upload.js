const fs = require('fs')
const path = require('path')

// Stream leitura e escrita de arquivo de maneira sincrona
// fs.readFile('./assets/img/shitzu.png', (erro, buffer) => {
//     console.log('Imagem foi bufferizada')
//     console.log(erro);
//     console.log(buffer);
//
//     fs.writeFile('./assets/shitzu.png', buffer, erro => {
//         console.log('Imagem foi escrita')
//     })
// })

// Stream leitura e escrita de arquivo de maneira assincrona
// fs.createReadStream('./assets/img/shitzu.png')
//     .pipe(fs.createWriteStream('./assets/shitzu-stream.png'))
//     .on('finish', () => console.log('Imagem foi escrita com sucesso'))

module.exports = (origin, fileName, callbackCreated) => {
    const extValids = ['jpg', 'png', 'gif']
    const ext = path.extname(origin)
    const destination = `./assets/images/${fileName}${ext}`
    const extValid = extValids.indexOf(ext.substr(1)) !== -1
    if (!extValid)
    {
        callbackCreated('Erro! Tipo inválido.')
        return
    }

    fs.createReadStream(origin)
        .pipe(fs.createWriteStream(destination))
        .on('finish', () => callbackCreated(false, destination))
}