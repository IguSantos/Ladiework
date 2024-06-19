var pool = require("../../config/pool_connections");

const mentoringModel = {
    findAll: async () => {
        try {
            const [lines] = await pool.query('SELECT * FROM mentora');
            return lines;
        } catch (error) {
            console.error('Erro ao buscar todas as mentorias:', error);
            throw error; 
        }
    },

    create: async (camposForm) => {
        try {
            const [results] = await pool.query("INSERT INTO mentora SET ?", [camposForm]);
            return results;
        } catch (error) {
            console.error('Erro ao criar nova mentoria:', error);
            throw error;
        }
    },
};


module.exports = mentoringModel