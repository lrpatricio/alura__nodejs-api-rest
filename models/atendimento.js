const conexao = require('../infraestrutura/database/conexao')
const repository = require('../repositorios/atendimento')
const moment = require('moment')

class Atendimento {
    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({tamanho}) => tamanho >= 5
        this.valida = parametros => this.validacoes.filter(campo => {
            const {nome} = campo
            const parametro = parametros[nome]

            if (!parametro) {
                return false;
            }

            return !campo.valido(parametro)
        })
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const erros = this.valida({
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        })

        if (erros.length > 0) {
            return new Promise((resolve, reject) => reject(erros))
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        return repository.adiciona(atendimentoDatado)
            .then((results) => {
                const id = results.insertId
                return {...atendimento, id}
            })
    }

    lista() {
        return repository.lista()
    }

    detalhes(id) {
        return repository.detalhes(id)
    }

    altera(id, atendimento) {
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, data}
        if (atendimento.cliente) {
            const erros = this.valida({
                cliente: {tamanho: atendimento.cliente.length}
            })

            if (erros.length > 0) {
                return new Promise((resolve, reject) => reject(erros))
            }
        }

        return repository.altera(id, atendimentoDatado)
            .then(() => repository.detalhes(id))
    }

    remove(id) {
        return repository.remove(id)
    }
}

module.exports = new Atendimento()