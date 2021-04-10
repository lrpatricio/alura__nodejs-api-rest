const conexao = require('../infraestrutura/database/conexao')
const upload = require('../infraestrutura/arquivos/upload')

class Pet {
    adiciona(pet, res) {
        const sql = 'INSERT INTO pets SET ?'

        upload(pet.imagem, pet.nome, (erro, destination) => {
            if(erro)
            {
                res.status(400).json({erro})
                return
            }

            const petNew = { ...pet, imagem: destination }
            conexao.query(sql, pet, erro => {
                if (erro) {
                    res.status(400).json({erro})
                } else {
                    res.status(201).json(petNew)
                }
            })
        })
    }
}

module.exports = new Pet()