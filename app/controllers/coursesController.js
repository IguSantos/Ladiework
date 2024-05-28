const courseModel = require("../models/coursemodel");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

const courseController = {

    listPaginatedCourses: async (req, res) => {
        res.locals.moment = moment; // O QUE É MOMENT?
        try {
            let page  = req.query.page == undefined ? 1 : req.query.page; // Definir a página atual
            let results = null // Valor padrão como nulo para oferecer ao paginador "false"
            let regPage = 6 // Definir a quantidade de itens por página
            let start = parseInt(page - 1) * regPage // Cálculo de páginas necessárias para cada página
            let totReg = await courseModel.totalReg(); // Volta pro course models e pega o total de REGISTRO
            let totPages = Math.ceil(totReg[0].total / regPage); // Total de páginas (1, 2 e 3...)
            results = await courseModel.findPage(start, regPage); // Usa o metodo "Inicio e Quantia" 0,5
            let pager = totReg[0].total <= regPage ? null : { "pagina_atual": page, "total_reg" : totReg[0].total, "total_paginas" : totPages };
             res.render("pages/main", { courses: results, pager: pager }); // Seria o main ou a pagina de cursos?
        } catch (e) {
            console.log(e); // exibir os erros no console do vs code
            res.json({ erro: "Falha ao acessar dados" });
        }
    },

}

module.exports = courseController