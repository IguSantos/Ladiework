var pool = require("../../config/pool_connections");

const courseModel = {


    findID: async (id) => {
        try {
            const [results] = await pool.query('SELECT * FROM cursos WHERE ID_CURSOS = ?', [id]); // Seleciona o curso pelo ID
            return results;
        } catch (error) {
            return error;
        }
    }
    

}; 

module.exports = courseModel