const Atendimento = require('../models/atendimento')
const axios = require('axios')

module.exports = app => {
    app.get('/atendimentos', (req, res) => Atendimento.lista()
        .then((results) => res.json(results))
        .catch(err => res.status(400).json(err))
    )

    app.get('/atendimentos/:id', (req, res) => Atendimento.detalhes(parseInt(req.params.id))
        .then(results => {
            if (results.length === 0) {
                res.status(404).send()
                return
            }

            const atendimento = results[0]
            const cpf = atendimento.cliente

            axios.get(`http://localhost:8082/${cpf}`)
                .then((response) => response.data)
                .catch(error => null)
                .then((cliente) => res.json({...atendimento, cliente}))
        })
        .catch(err => res.status(400).json(err))
    )

    app.post('/atendimentos', (req, res) => Atendimento.adiciona(req.body)
        .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
        .catch(err => res.status(400).json(err))
    )

    app.patch('/atendimentos/:id', (req, res) =>
        Atendimento.altera(parseInt(req.params.id), req.body)
            .then((results) => res.json(results))
            .catch(err => res.status(400).json(err))
    )

    app.delete('/atendimentos/:id', (req, res) =>
        Atendimento.remove(parseInt(req.params.id))
            .then((results) => res.json(results))
            .catch(err => res.status(400).json(err))
    )
}