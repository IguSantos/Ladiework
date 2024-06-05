var pool = require("../../config/pool_connections");

const userModel = {
    findAll: async () => {
        try {
            const [results] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO" +
                "u.SENHA, u.EMAIL_USUARIO, u.CELULAR_USUARIO, u.FOTO_USUARIO " +
                "u.DT_NASC_USUARIO, t.MENTORA_ID_MENTORA, t.DESCRICAO_USUARIO " +
                "FROM usuario u"
            )

            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findUserEmail: async (camposForm) => {
        try {
            const [results] = await pool.query(
                "SELECT * FROM usuario WHERE EMAIL_USUARIO = ?", // Errado ou nao?
                [camposForm.EMAIL_USUARIO, camposForm.EMAIL_USUARIO]
            )
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    create: async (camposForm) => {
        try {
            const [results] = await pool.query(
                "insert into usuario set ?", [camposForm]
            )
            return results;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    // TERA TIPO DE USUARIO?

    findId: async (id) => {
        try {
            const [results] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO"  +
                "u.SENHA, u.EMAIL_USUARIO, u.CELULAR_USUARIO, u.FOTO_USUARIO " +
                "u.DT_NASC_USUARIO, t.MENTORA_ID_MENTORA, t.DESCRICAO_USUARIO " +
                "FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                "u.tipo_usuario = t.id_tipo_usuario and u.ID_USUARIO = ? ", [id]
            )
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },


};

module.exports = userModel