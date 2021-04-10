const Pet = require('../models/pet')

module.exports = app => {
    app.get('/pets', (req, res) => res.send('ok'))

    app.get('/atendimentos/:id', (req, res) => Atendimento.detalhes(parseInt(req.params.id), res))

    app.post('/pets', (req, res) => Pet.adiciona(req.body, res))

    app.patch('/pets/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body;

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => Atendimento.remove(parseInt(req.params.id), res))
}