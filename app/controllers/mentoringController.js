const mentoringModel = require("../models/mentoringmodel");
const { validationResult } = require('express-validator'); // Importe a função validationResult para lidar com os resultados da validação



const mentoringController = {

    addMentoring: async (req, res) => {
     // Executa as validações e obtém os erros
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            console.log(errors); // Me fornece o erro
            return res.render("pages/main", { pagina: "criar", dados: req.body, errorsList: errors }); // Recarrega a página 
        }

        // Salva os dados dentro do Data form
        var dataForm = {
            TITULO_MENTORA: req.body.titulo,
            BIOGRAFIA_MENTORA: req.body.descricao,
        };

        try {
            // Cria a nova mentoria usando o modelo `mentoringModel`
            const create = await mentoringModel.create(dataForm);

            // Salva as informações da mentoria recém-criada na sessão (se necessário)
            req.session.latestMentoring = req.body.titulo;

            console.log("Mentoria criada com sucesso!");
            return res.redirect("/paginadeadministracao");

        } catch (error) {
            console.error('Erro ao criar mentoria:', error);
            return res.json({ erro: "Falha ao acessar dados" });
        }
    },



}

module.exports = mentoringController