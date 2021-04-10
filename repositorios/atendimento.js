const query = require('../infraestrutura/database/queries')

class Atendimento {
    lista() {
        const sql = "SELECT * FROM atendimentos"
        return query(sql)
    }

    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }

    detalhes(id) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?'
        return query(sql, id)
    }

    remove(id) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'
        return query(sql, id)
    }

    altera(id, atendimento) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'
        return query(sql, [atendimento, id])
    }
}

module.exports = new Atendimento()