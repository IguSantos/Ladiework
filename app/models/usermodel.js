var pool = require("../../config/pool_connections");


const userModel = {
   // Seleciona todas as infromações da tabela usuario
    findAll: async () => {
        try {
            const [results] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO" +
                "u.SENHA, u.EMAIL_USUARIO, u.CELULAR_USUARIO, u.FOTO_USUARIO " +
                "u.DT_NASC_USUARIO, t.MENTORA_ID_MENTORA" +
                "FROM usuario u"
            )

            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

 //Encontrar o usuario com base no email fornecido
    findUserEmail: async (camposForm) => {
        try {
            const [results] = await pool.query(
                "SELECT * FROM usuario WHERE EMAIL_USUARIO = ?",   // Campo email é igual ao valor do parametro passado no ?
                [camposForm.EMAIL_USUARIO]
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