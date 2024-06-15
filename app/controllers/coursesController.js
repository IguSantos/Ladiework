const courseModel = require("../models/coursemodel");

const courseController = {


    listPaginatedCourses: async (req, res) => {
        
        try {
            let page  = req.query.page == undefined ? 1 : req.query.page; // Definir a página atual
            let results = null // Valor padrão como nulo para oferecer ao paginador "false"
            let regPage = 6 // Definir a quantidade de itens por página
            let start = parseInt(page - 1) * regPage // Cálculo de páginas necessárias para cada página
            let totReg = await courseModel.totalReg(); // Volta pro course models e pega o total de REGISTRO
            let totPages = Math.ceil(totReg[0].total / regPage); // Total de páginas (1, 2 e 3...)
            results = await courseModel.findPage(start, regPage); // Usa o metodo "Inicio e Quantia" 0,5
            let pager = totReg[0].total <= regPage ? null : { "pagina_atual": page, "total_reg" : totReg[0].total, "total_paginas" : totPages };
             res.render("pages/main", {pagina: "cursos" , courses: results, pager: pager , logado: req.session.logado}); // Seria o main ou a pagina de cursos?
        } catch (e) {
            console.log(e); // exibir os erros no console do vs code
            res.json({ erro: "Falha ao acessar dados" });
        }
    },

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