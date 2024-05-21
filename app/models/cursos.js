var pool = require("../../config/pool_connections");

const cursos = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tarefas WHERE status_tarefa = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    },

};
    

module.exports = cursos