var pool = require("../../config/pool_connections");


const userModel = {
   // Seleciona todas as infromações da tabela usuario
    findAll: async () => {
        try {
            const [results] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO, " +
                "u.SENHA, u.EMAIL_USUARIO, u.CELULAR_USUARIO, u.FOTO_USUARIO, " +
                "u.DT_NASC_USUARIO, u.DT_CRIACAO_CONTA_USUARIO " +
                "FROM usuario u"
            );

            return results;
        } catch (error) {
            console.log("Erro ao encontrar os usuários!!", error);
            return error;
        }
    },

 //Encontrar o usuario com base no email fornecido
    findUserEmail: async (camposForm) => {
        try {
            const [results] = await pool.query(
                "SELECT * FROM usuario WHERE EMAIL_USUARIO = ?",   // Campo email é igual ao valor do parametro passado no ?
                [camposForm.EMAIL_USUARIO] // camposForm = Dataform
            )
            return results;
        } catch (error) {
            console.log("Erro ao comparar email!!" , error);
            return error;
        }
    },

    create: async (camposForm) => {
        try {
            const [results] = await pool.query(
                "insert into usuario set ?", [camposForm] // PEga o campos forms e insere todos os dados do cadastro
            )
            
            return results;
        } catch (error) {
            console.log("Erro ao criar a conta!!", error);
            return null;
        }
    },

    findId: async (id) => {
        try {
            const [results] = await pool.query(
                "SELECT u.ID_USUARIO, u.NOME_USUARIO" +
                "u.SENHA, u.EMAIL_USUARIO" +
                "u.CELULAR_USUARIO, u.FOTO_USUARIO" +
                "t.id_tipo_usuario, t.descricao_usuario " +
                "FROM usuario u, tipo_usuario t where u.status_usuario = 1 and " +
                "u.tipo_usuario = t.id_tipo_usuario and u.id_usuario = ? ", [id]
            )
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },



};

module.exports = userModel