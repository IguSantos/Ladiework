var pool = require("../../config/pool_connections");

const courseModel = {
    findAll: async () => {
        try {
            const [lines] = await pool.query('SELECT * FROM cursos') // Seleciona todos os cursos
            return lines;
        } catch (error) {
            return error;
        }
    },

    findPage: async (page, total) => {
        try {
            const [lines] = await pool.query('SELECT * FROM cursos limit ?, ?', [page , total]) // Seleciona o limite da paginação
            return lines;
        } catch (error) {
            return error;
        }  
    },

    totalReg: async ()=>{
        try {
            const [lines] = await pool.query('SELECT count(*) total FROM cursos') // Contagem total dos cursos para a paginacao
            return lines;
        } catch (error) {
            return error;
        }  
    },

   posicaoRegCurso: async (id) => {
        try {
            const [lines] = await pool.query(
                'SELECT *, ' +
                '(SELECT COUNT(*) + 1 FROM cursos AS c2 WHERE c2.ID_CURSOS < c1.ID_CURSOS) AS numero_ordem ' +
                'FROM cursos AS c1 WHERE c1.ID_CURSOS = ?;',
                [id]
            );
            return lines;
        } catch (error) {
            return error;
        }
    }
    

}; 

module.exports = courseModel