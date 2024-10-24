var pool = require("../../config/pool_connections");

const mentoringModel = {
    findAll: async () => {
        try {
            const [lines] = await pool.query(
                'SELECT TITULO_MENTORA, BIOGRAFIA_MENTORA, DISPONIBILIDADE_HORARIO_MENTORA, VALOR_MENTORIA_MENTORA, DURACAO_MENTORIA, FOTO_THUMBNAIL FROM mentora'
            );
            return lines;
        } catch (error) {
            console.error('Erro ao buscar todas as mentorias:', error);
            throw error;
        }
    },

    findById: async (mentoriaId,userId) => {
        try {
            const [rows] = await pool.query('SELECT * FROM mentora WHERE ID_MENTORA = ? and usuario_ID_USUARIO = ?', [mentoriaId, userId]);
            return rows; // Retorna a primeira linha encontrada
        } catch (error) {
            console.error('Erro ao buscar mentoria por ID do mentoria:', error);
            throw error;
        }
    },
    

    findByUserId: async (userId) => {
        try {
            const [rows] = await pool.query('SELECT * FROM mentora WHERE usuario_ID_USUARIO = ?', [userId]);
            return rows; // Retorna a primeira linha encontrada
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
            const [results] = await pool.query("UPDATE mentora SET ? WHERE id = ?", [id, camposForm]);
            return results;
        } catch (error) {
            console.error('Erro ao atualizar mentoria:', error);
            throw error;
        }
    },

    update: async (camposForm, id) => {
        try {
            console.log("*******")
            console.log(camposForm)
            console.log(id)
            const [resultados] = await pool.query(
                "UPDATE mentora SET ? " +
                "WHERE id_mentora = ? ",
                [camposForm, id]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    // PAGINAÇÃO

    findPage: async (userId, page, total ) => {
        try {
            const [lines] = await pool.query('SELECT * FROM mentora WHERE usuario_ID_USUARIO = ? limit ?, ?', [userId, page, total])
            // Seleciona o limite da paginação
            return lines;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [lines] = await pool.query('SELECT count(*) total FROM mentora') // Contagem total dos cursos para a paginacao
            return lines;
        } catch (error) {
            return error;
        }
    },

    posicaoRegMentoria: async (id) => {
        try {
            const [lines] = await pool.query(
                'SELECT *, ' +
                '(SELECT COUNT(*) + 1 FROM mentora AS c2 WHERE c2.usuario_ID_USUARIO < c1.usuario_ID_USUARIO) AS numero_ordem ' +
                'FROM mentora AS c1 WHERE c1.usuario_ID_USUARIO = ?;',
                [id]
            );
            return lines;
        } catch (error) {
            return error;
        }
    },

};


module.exports = mentoringModel