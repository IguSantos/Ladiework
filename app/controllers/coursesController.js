const courseModel = require("../models/coursemodel");

const courseController = {


    addCourse: async (req, res) => {
       
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/main", { pagina: "criar" , dados: req.body, errorsList: errors });
        }

        var dataForm = {
            TITULO_MENTORA: req.body.titulo,
            BIOGRAFIA_MENTORA: req.body.prazo,
           
        };

        try {
            if(id_tarefa==""){
                results = await courseModel.create(dadosForm);
                totReg = await courseModel.totalReg();
                paginaAtual = Math.ceil(totReg[0].total/5)
                res.redirect("/?pagina="+ paginaAtual);    
            }else{
                results = await courseModel.update(dadosForm,id_tarefa);
                let posicao = await courseModel.posicaoReg(id_tarefa);
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