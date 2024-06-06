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

}; 

module.exports = courseModel