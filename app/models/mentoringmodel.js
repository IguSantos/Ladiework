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
    },

    // PAGINAÇÃO

    findPage: async (page, total) => {
        try {
            const [lines] = await pool.query('SELECT * FROM mentora limit ?, ?', [page , total]) // Seleciona o limite da paginação
            return lines;
        } catch (error) {
            return error;
        }  
    },

    totalReg: async ()=>{
        try {
            const [lines] = await pool.query('SELECT count(*) total FROM mentora') // Contagem total dos cursos para a paginacao
            return lines;
        } catch (error) {
            return error;
        }  
    },

   posicaoRegMentoria: async (id) => {

//    para giovanni: troque pro id mentoria etc
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
    },
};


module.exports = mentoringModel