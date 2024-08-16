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

    findByUserId: async (userId) => {
        try {
            const [rows] = await pool.query('SELECT * FROM mentora WHERE usuario_ID_USUARIO = ?', [userId]);
            return rows[0]; // Retorna a primeira linha encontrada
        } catch (error) {
            console.error('Erro ao buscar mentoria por ID do usuário:', error);
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

    updateById: async (id, camposForm) => {
        try {
            const [results] = await pool.query("UPDATE mentora SET ? WHERE id = ?", [camposForm, id]);
            return results;
        } catch (error) {
            console.error('Erro ao atualizar mentoria:', error);
            throw error;
        }
    }
};


module.exports = mentoringModel