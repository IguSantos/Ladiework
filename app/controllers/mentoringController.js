const mentoringModel = require("../models/mentoringmodel");
const usuario = require("../models/usermodel");
const { validationResult } = require('express-validator'); // Importe a função validationResult para lidar com os resultados da validação
const moment = require('moment');



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
            FORM_ACADEMICA_MENTORA: req.body.formacao,
            DISPONIBILIDADE_HORARIO_MENTORA: req.body.disponibilidade,
            DURACAO_MENTORIA: req.body.duracao,
            VALOR_MENTORIA_MENTORA: req.body.valor,
            FOTO_THUMBNAIL: req.file ? req.file.buffer : null,
            usuario_ID_USUARIO: req.session.logado.id
        };

        try {
            // Cria a nova mentoria usando o modelo `mentoringModel`
            const create = await mentoringModel.create(dataForm);

            // Salva as informações da mentoria recém-criada na sessão (se necessário)
            req.session.latestMentoring = {
                titulo: dataForm.TITULO_MENTORA,
                biografia: dataForm.BIOGRAFIA_MENTORA,
                formacao: dataForm.FORM_ACADEMICA_MENTORA,
                disponibilidade: dataForm.DISPONIBILIDADE_HORARIO_MENTORA, // Corrigido aqui
                duracao: dataForm.DURACAO_MENTORIA,
                valor: dataForm.VALOR_MENTORIA_MENTORA,
                thumbnail: dataForm.FOTO_THUMBNAIL
            };

            console.log(req.session.latestMentoring);

            console.log("Mentoria criada com sucesso!");
            return res.redirect("/paginadeadministracao");

        } catch (error) {
            console.error('Erro ao criar mentoria:', error);
            return res.json({ erro: "Falha ao acessar dados" });
        }
    },

    listarTiposMentoria: async (req, res) => {
        try {
            let pagina = req.query.pagina == undefined ? 1 : parseInt(req.query.pagina);
            let regPagina = 5;
            let inicio = (pagina - 1) * regPagina;
    
            console.log('Página:', pagina);
            console.log('Início:', inicio);
    
            let totReg = await mentoringModel.totalReg();
            console.log('Total de Registros:', totReg);
    
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
    
            let results;
            if (req.session.logado && req.session.logado.id) {
                // Caso o usuário esteja logado, busca as mentorias associadas ao ID do usuário
                results = await mentoringModel.findPage(req.session.logado.id, inicio, regPagina);
                console.log("id:", req.session.logado.id);
            } else {
                // Se o usuário não estiver logado, busca as mentorias sem filtrar pelo ID
                results = await mentoringModel.findPage(null, inicio, regPagina);
            }
    
            console.log('Total de Páginas:', totPaginas);
            console.log('Resultados:', results);
    
            let paginador = totReg[0].total <= regPagina
                ? null
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };
    
            console.log('Paginador:', paginador);
    
            res.render('pages/main', {
                pagina: "mentorias",
                logado: req.session.logado || null,
                dadosNotificacao: null,
                listarTiposMentoria: results,
                paginador: paginador
            });
        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },
    

    listarMentoria: async (req, res) => {

        try {
            let pagina = req.query.pagina == undefined ? 1 : parseInt(req.query.pagina);
            let regPagina = 5;
            let inicio = (pagina - 1) * regPagina;

            // Log do início para verificar se está correto
            console.log('Página:', pagina);
            console.log('Início:', inicio);

            let totReg = await mentoringModel.totalReg();
            console.log('Total de Registros:', totReg); // Verificar o que está sendo retornado

            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            let results = await mentoringModel.findPage(req.session.logado.id, inicio, regPagina);
           
            // Verificar o número total de páginas e os resultados
            console.log('Total de Páginas:', totPaginas);
            console.log('Resultados:', results);

            let paginador = totReg[0].total <= regPagina
                ? null
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            console.log('Paginador:', paginador); // Verificar se o paginador foi criado corretamente

            res.render('pages/adm/usuaria/dashboard', { pagina: "homeadm", logado: req.session.logado, mentoring: results, dadosNotificacao: null, paginador: paginador });

        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }

    },

    adicionarMentoria: async (req, res) => {
        res.locals.moment = moment;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/dashboard", { dados: req.body, listaErros: errors });
        }
        var dadosForm = {
            TITULO_MENTORA: req.body.TITULO_MENTORA,
            DURACAO_MENTORIA: req.body.DURACAO_MENTORIA,
            VALOR_MENTORIA_MENTORA: req.body.VALOR_MENTORIA_MENTORA,
            BIOGRAFIA_MENTORA: req.body.BIOGRAFIA_MENTORA,
            FOTO_THUMBNAIL: req.file ? req.file.filename : null,
        };
    
        if (req.file) {
            dadosForm.FOTO_THUMBNAIL = req.file.filename;
        } else {
            console.log("Falha no carregamento da imagem");
        }
    
        console.log(dadosForm);
    
        let resultUpdate = await mentoringModel.update(dadosForm, req.body.ID_MENTORA);
        console.log(resultUpdate);
    
        if (!resultUpdate.isEmpty) {
            if (resultUpdate.changedRows == 1) {
                var result = await mentoringModel.findById(req.body.ID_MENTORA, req.session.logado.id);
                var results = await mentoringModel.findByUserId(req.session.logado.id);
                
                console.log(result);
                var logado = {
                    id: results[0].usuario_ID_USUARIO,
                    nome: results[0].NOME_USUARIO,
                    telefone: results[0].CELULAR_USUARIO,
                    email: results[0].EMAIL_USUARIO,
                    criacao: results[0].DT_CRIACAO_CONTA_USUARIO,
                    mentora: result[0].TITULO_MENTORA,
                    FOTO_THUMBNAIL: result[0].FOTO_THUMBNAIL != null ? `data:image/jpeg;base64,${result[0].FOTO_THUMBNAIL.toString('base64')}` : null,
                };
                req.session.logado = logado;
    
                var campos = {
                    TITULO_MENTORA: result[0].TITULO_MENTORA, 
                    BIOGRAFIA_MENTORA: result[0].BIOGRAFIA_MENTORA,
                    DURACAO_MENTORIA: result[0].DURACAO_MENTORIA, 
                    VALOR_MENTORIA_MENTORA: result[0].VALOR_MENTORIA_MENTORA,
                    FOTO_THUMBNAIL: result[0].FOTO_THUMBNAIL,
                };
    
                // Aqui passamos o 'result' como 'mentoring'
                return res.render("pages/adm/usuaria/dashboard", { pagina: "homeadm", mentoring: results, listaErros: null, dadosNotificacao: { titulo: "Mentoria atualizada com sucesso", mensagem: "Alterações Gravadas", tipo: "success" }, valores: campos });
            } else {
                return res.render("pages/adm/usuaria/dashboard", { pagina: "editar", mentoring: result, listaErros: null, dadosNotificacao: { titulo: "Mentoria atualizada sem alterações", mensagem: "Sem alterações", tipo: "error" }, valores: dadosForm });
            }
        }
    
        // paginação 
        let ID_MENTORA = req.body.ID_MENTORA;
        try {
            if (ID_MENTORA == "") {
                results = await mentoringModel.create(dadosForm);
                totReg = await mentoringModel.totalReg();
                paginaAtual = Math.ceil(totReg[0].total / 5)
                return res.redirect("/?pagina=" + paginaAtual);
            } else {
                results = await mentoringModel.update(dadosForm, ID_MENTORA);
                let posicao = await mentoringModel.posicaoRegMentoria(req.session.logado.id);
                console.log(posicao);
                let url = "/?pagina=" + Math.ceil(posicao[0].numero_ordem / 5);
                return res.redirect(url);
            }
        } catch (e) {
            console.log(e);
            res.json("pages/dashboard", { erro: "Falha ao acessar dados" });
        }
    },

    editarMentoria: async (req, res) => {
        try {
            let results = await usuario.findId(req.session.logado.id);
            console.log(results);
    
            let campos = {
                ID_MENTORA: req.query.ID_MENTORA,
                TITULO_MENTORA: results[0].TITULO_MENTORA, 
                BIOGRAFIA_MENTORA: results[0].BIOGRAFIA_MENTORA,
                DURACAO_MENTORIA: results[0].DURACAO_MENTORIA, 
                VALOR_MENTORIA_MENTORA: results[0].VALOR_MENTORIA_MENTORA,
                FOTO_THUMBNAIL: results[0].FOTO_THUMBNAIL,
            };

            console.log(campos)

            let dadosNotificacao = null;

            res.render("pages/adm/usuaria/dashboard", {
                pagina: "editar",
                listaErros: null,
                dadosNotificacao,
                valores: campos,
                logado: req.session.logado
            });
        } catch (e) {
            console.log(e);
            res.render("pages/adm/usuaria/dashboard", {
                pagina: "editar",
                listaErros: e,
                dadosNotificacao: { tipo: "error", mensagem: "Falha ao atualizar mentoria" },
                valores: null,
                logado: req.session.logado
            });
        }
    },
    
}



module.exports = mentoringController