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
            console.log("Erro ao comparar email!!", error);
            return error;
        }
    },

    create: async (camposForm) => {
        try {
            // Execute a inserção no banco de dados
            const [results] = await pool.query(
                "INSERT INTO usuario SET ?", [camposForm]
            );

            // Verifique se o resultado contém o ID
            if (results.insertId) {
                // Retorne o ID gerado
                return { ID_USUARIO: results.insertId };
            } else {
                console.log("Erro: ID do usuário não foi retornado.");
                return null;
            }
        } catch (error) {
            console.log("Erro ao criar a conta!!", error);
            return null;
        }
    },

    findId: async (id) => {
        try {
            const [results] = await pool.query(
                "SELECT * " +
                "FROM usuario u " +
                "INNER JOIN mentora t ON u.ID_USUARIO = t.usuario_ID_USUARIO " +
                "WHERE u.ID_USUARIO = ?",
                [id]
            );
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findUserCustom: async (criterionWhere) => {
        try {
            const [results] = await pool.query(
                "SELECT *  FROM usuario WHERE ?",
                [criterionWhere]
            )
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    findCampoCustom: async (criterioWhere) => {
        try {
            const [results] = await pool.query(
                "SELECT count(*) totalReg FROM usuario WHERE ?",
                [criterioWhere]
            )
            return results[0].totalReg;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    update: async (camposForm, emailUser) => {
        try {
            const [results] = await pool.query(
                "UPDATE usuario SET ? WHERE EMAIL_USUARIO = ?",
                [camposForm, emailUser]
            )
            return results;
        } catch (error) {
            console.log(error);
            return error;
        }
    },




};

module.exports = userModel