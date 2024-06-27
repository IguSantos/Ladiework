const user = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const userController = {
    // REGRAS DE CADASTRO + MENSAGENS
    validationRulesFormCad: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 }).withMessage("Mínimo de 4 letras e máximo de 45!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),
        body("numero_usu")
            .isMobilePhone("pt-BR", { min: 11, max: 11 }).withMessage("Coloque seu número de telefone correto!") // aqui

    ],

    cadastrar: async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        // GUARDAR INFORMAÇÕES DO CADASTRO

        const dataForm = {
            NOME_USUARIO: req.body.nome_usu,
            SENHA_USUARIO: bcrypt.hashSync(req.body.senha_usu, salt),
            EMAIL_USUARIO: req.body.email_usu,
            FOTO_USUARIO: req.body.foto_usu,
            CELULAR_USUARIO: req.body.numero_usu,
            DT_NASC_USUARIO: req.body.aniversario_usu,
            DT_CRIACAO_CONTA_USUARIO: new Date()
        };



        // Se algo der errado em todo o cadastro ele reseta
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/main", { pagina: "home", logado: null , errorsList: errors, valores: req.body });
        }


        // CRIAR USUARIO
        try {
            // let findUserEmail = await user.findUserEmail(dataForm);
            // if (findUserEmail) {
            //     console.log("EMAIL JA EXISTE!!")
            // }
            // else {
            let create = await user.create(dataForm);
          req.session.logado = {
               nome: dataForm.NOME_USUARIO,
               email: dataForm.EMAIL_USUARIO,
                telefone: dataForm.CELULAR_USUARIO
            };
            res.redirect("/");
            // }
        } catch (error) {
            console.log("Erro ao cadastrar:", error);
            res.render("pages/main", {
                pagina: "cadastro",
                errorsList: errors,
                valores: req.body
            });
        }
    },

    validationRulesFormLogin: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 })
            .withMessage("O nome de usuário deve ter de 4 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 4 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],


    logar: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("pages/main", { pagina: "login", errorsList: errors, logado: null });
            }
    
            const dataForm = {
                EMAIL_USUARIO: req.body.email_usu,
                SENHA_USUARIO: req.body.senha_usu
            };
    
            let findUserEmail = await user.findUserEmail(dataForm);
            if (findUserEmail.length === 1 && bcrypt.compareSync(dataForm.SENHA_USUARIO, findUserEmail[0].SENHA_USUARIO)) {
                // Formatando a data de criação
                const criacaoDate = new Date(findUserEmail[0].DT_CRIACAO_CONTA_USUARIO);
                const mes = criacaoDate.toLocaleString('default', { month: 'long' });
                const ano = criacaoDate.getFullYear();
                const criacaoFormatada = `${mes} ${ano}`;
    
                req.session.logado = {
                    nome: findUserEmail[0].NOME_USUARIO,
                    email: findUserEmail[0].EMAIL_USUARIO,
                    telefone: findUserEmail[0].CELULAR_USUARIO,
                    criacao: criacaoFormatada
                    // Adicione mais campos conforme necessário
                }; 
                return res.redirect("/");
            } else {
                res.render("pages/main", { pagina: "login", errorsList: [{ msg: "Credenciais inválidas" }], logado: null });
            }
        } catch (e) {
            console.log("Deu erro no logar!!", e);
            res.render("pages/main", { pagina: "login", errorsList: [{ msg: "Erro no servidor" }], logado: null });
        }
    },
    

    showProfile: async (req, res) => {
        // Define uma função assíncrona chamada 'showProfile' que recebe dois parâmetros
        try {
            // Inicia um bloco try, que tentará executar o código dentro dele. Se houver um erro, ele será capturado pelo bloco catch.

            let results = await user.findId(req.session.logado.id);
            // Espera (await) o retorno de uma função assíncrona 'findId' do objeto 'user', passando o ID do usuário logado (req.session.logado.id). 
            // Isso presumivelmente retorna os detalhes do usuário do banco de dados e os armazena na variável 'results'.
            
            let campos = {
                foto_usu: results[0].FOTO_USUARIO != null ? `data:image/jpeg;base64, ${results[0].FOTO_USUARIO.toString('base64')}` : null,
                // Verifica se a imagem de perfil armazenada no banco de dados não é nula. Se não for, converte a imagem para uma string base64 e a armazena em 'FOTO_USUARIO'.
                // Se for nula, armazena null..

                senha_usuario: ""
                // Define 'senha_usu' como uma string vazia, presumivelmente por motivos de segurança para não exibir a senha do usuário.
            }
    
            res.render("pages/perfil", { errorsList: null, valores: campos })
            // Renderiza a página de perfil ('pages/perfil'), passando um objeto com 'errorsList' como null (sem erros) e 'valores' contendo os campos definidos anteriormente.
        } catch (e) {
            // Captura qualquer erro que ocorrer no bloco try.
            console.log("Deu erro na renderização da imagem", e);
            // Loga o erro no console para fins de debug.
            res.render("pages/perfil", {
                errorsList: null, valores: {
                    foto_usu: ""
                    // Renderiza novamente a página de perfil, mas com 'FOTO_USUARIO' como uma string vazia, presumivelmente porque ocorreu um erro e não foi possível carregar a imagem.
                }
            })
        }
    },
    

    gravarPerfil: async (req, res) => {

        const erros = validationResult(req);
        const erroMulter = req.session.erroMulter;
        if (!erros.isEmpty() || erroMulter != null ) {
            lista =  !erros.isEmpty() ? erros : {formatter:null, errors:[]};
            if(erroMulter != null ){
                lista.errors.push(erroMulter);
            } 
            return res.render("pages/perfil", { listaErros: lista, dadosNotificacao: null, valores: req.body })
        }
        try {
            var dadosForm = {

                FOTO_USUARIO: req.session.logado.FOTO_USUARIO,
            
            };
            if (req.body.senha_usu != "") {
                dadosForm.senha_usuario = bcrypt.hashSync(req.body.senha_usu, salt);
            }
            if (!req.file) {
                console.log("Falha no carregamento");
            } else {
                //Armazenando o caminho do arquivo salvo na pasta do projeto 
                caminhoArquivo = "imagem/perfil/" + req.file.filename;
                //Se houve alteração de imagem de perfil apaga a imagem anterior
                if(dadosForm.img_perfil_pasta != caminhoArquivo ){
                    removeImg(dadosForm.img_perfil_pasta);
                }
                dadosForm.img_perfil_pasta = caminhoArquivo;
                dadosForm.FOTO_USUARIO = null;

                // //Armazenando o buffer de dados binários do arquivo 
                // dadosForm.FOTO_USUARIO = req.file.buffer;                
                // //Apagando a imagem armazenada na pasta
                // if(dadosForm.img_perfil_pasta != null ){
                //     removeImg(dadosForm.img_perfil_pasta);
                // }
                // dadosForm.img_perfil_pasta = null; 
            }
            let resultUpdate = await usuario.update(dadosForm, req.session.autenticado.id);
            if (!resultUpdate.isEmpty) {
                if (resultUpdate.changedRows == 1) {
                    var result = await usuario.findId(req.session.autenticado.id);
                    var autenticado = {
                        autenticado: result[0].nome_usuario,
                        id: result[0].id_usuario,
                        tipo: result[0].id_tipo_usuario,
                        FOTO_USUARIO: result[0].FOTO_USUARIO != null ? `data:image/jpeg;base64,${result[0].FOTO_USUARIO.toString('base64')}` : null,
                        img_perfil_pasta: result[0].img_perfil_pasta
                    };
                    req.session.autenticado = autenticado;
                    var campos = {
                        nome_usu: result[0].nome_usuario, email_usu: result[0].email_usuario,
                        img_perfil_pasta: result[0].img_perfil_pasta, FOTO_USUARIO: result[0].FOTO_USUARIO,
                        nomeusu_usu: result[0].user_usuario, fone_usu: result[0].fone_usuario, senha_usu: ""
                    }
                    res.render("pages/perfil", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "Alterações Gravadas", tipo: "success" }, valores: campos });
                }else{
                    res.render("pages/perfil", { listaErros: null, dadosNotificacao: { titulo: "Perfil! atualizado com sucesso", mensagem: "Sem alterações", tipo: "success" }, valores: dadosForm });
                }
            }
        } catch (e) {
            console.log(e)
            res.render("pages/perfil", { listaErros: erros, dadosNotificacao: { titulo: "Erro ao atualizar o perfil!", mensagem: "Verifique os valores digitados!", tipo: "error" }, valores: req.body })
        }
    }




}

module.exports = userController

// ANOTAÇÕES



// data:image/jpeg;base64:
// Uma string que é a parte inicial de um URI de dados (Data URI). Indica que o conteúdo é uma imagem no formato JPEG codificada em base64.
