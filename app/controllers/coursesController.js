const courseModel = require("../models/coursemodel");

const courseController = {

    addCourse: async (req, res) => {
        // res.locals.moment = moment;
       
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/main", { pagina: "criar" , dados: req.body, errorsList: errors });
        }

        var dataForm = {
            TITULO_CURSOS: req.body.tarefa,
            DURACAO_CURSOS: req.body.prazo,
            NIVEL_DIFICUL_CURSOS: req.body.situacao,
            CATEGORIA_CURSOS: req.body.situacao
        };

        let ID_CURSOS = req.body.id_tarefa; // ???

        try {
            if(id_tarefa==""){
                results = await tarefasModel.create(dadosForm);
                totReg = await tarefasModel.totalReg();
                paginaAtual = Math.ceil(totReg[0].total/5)
                res.redirect("/?pagina="+ paginaAtual);    
            }else{
                results = await tarefasModel.update(dadosForm,id_tarefa);
                let posicao = await tarefasModel.posicaoReg(id_tarefa);
                let url = "/?pagina=" + Math.ceil(posicao[0].numero_ordem/5);
                res.redirect(url);
            }
        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }





    },



}

module.exports = courseController