const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length > 0

        if (existemErros) {
            res.status(400).json(erros)
            return
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(results)
            }
        })
    }

    lista(res) {
        const sql = "SELECT * FROM atendimentos"

        conexao.query(sql, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }

            res.json(results)
        })
    }

    detalhes(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ?`

        conexao.query(sql, id, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }
            if (results.length === 0) {
                res.status(404).send()
                return
            }

            res.json(results[0])
        })
    }

    altera(id, valores, res) {
        const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'
        const valoresDatado = {...valores, data}

        conexao.query(sql, [valoresDatado, id], (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }

            res.json(results)
        })
    }

    remove(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }

            res.json(results)
        })
    }
}

module.exports = new Atendimento()