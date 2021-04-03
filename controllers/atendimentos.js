const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => Atendimento.lista(res))

    app.get('/atendimentos/:id', (req, res) => Atendimento.detalhes(parseInt(req.params.id), res))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res)
    })
}