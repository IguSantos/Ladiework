const user = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const userController = {
    validationRulesFormCad: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 }).withMessage("Mínimo de 4 letras e máximo de 45!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("senha_usu")
            .isStrongPassword().withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),
        body("numero_usu")
            .isMobilePhone("pt-BR", { min: 11, max: 11 }).withMessage("Coloque seu número de telefone correto!")
    ],

    cadastrar: async (req, res) => {
        // Adicione isso para ver o que está no corpo da requisição
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/main", { 
                pagina: "home", 
                logado: null, 
                errorsList: errors.array(), 
                valores: req.body 
            });
        }
    
        // GUARDAR INFORMAÇÕES DO CADASTRO
        const dataForm = {
            NOME_USUARIO: req.body.nome_usu,
            SENHA_USUARIO: bcrypt.hashSync(req.body.senha_usu, salt),
            EMAIL_USUARIO: req.body.email_usu,
            FOTO_USUARIO: req.file ? req.file.buffer : null,
            CELULAR_USUARIO: req.body.numero_usu,
            DT_NASC_USUARIO: req.body.aniversario_usu,
            DT_CRIACAO_CONTA_USUARIO: new Date()
        };
    
    
        // TRATAMENTO DE IMAGEM
        if (req.file) {
            dataForm.FOTO_USUARIO = req.file.buffer;
        } else {
            console.log("Falha no carregamenton da imagem");
        }
    
        // CRIAR USUARIO
        try {
            let create = await user.create(dataForm);
            const criacaoDate = dataForm.DT_CRIACAO_CONTA_USUARIO;
            const options = { month: 'long', year: 'numeric' };
            const criacaoFormatada = new Intl.DateTimeFormat('pt-BR', options).format(criacaoDate);
    
            req.session.logado = {
                nome: dataForm.NOME_USUARIO,
                email: dataForm.EMAIL_USUARIO,
                telefone: dataForm.CELULAR_USUARIO,
                criacao: criacaoFormatada,
                foto: dataForm.FOTO_USUARIO ? `data:image/jpeg;base64,${dataForm.FOTO_USUARIO.toString('base64')}` : null
            };
    
            return res.redirect("/");  // Use return para evitar execução adicional
        } catch (error) {
            console.log("Erro ao cadastrar:", error);
            if (!res.headersSent) {
                return res.render("pages/main", {
                    pagina: "cadastro",
                    errorsList: errors.array(),
                    valores: req.body
                });
            }
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
                return res.render("pages/main", { pagina: "login", errorsList: errors.array(), logado: null });
            }
    
            const dataForm = {
                EMAIL_USUARIO: req.body.email_usu,
                SENHA_USUARIO: req.body.senha_usu
            };
    
            let findUserEmail = await user.findUserEmail(dataForm);
            if (findUserEmail.length === 1 && bcrypt.compareSync(dataForm.SENHA_USUARIO, findUserEmail[0].SENHA_USUARIO)) {
                // Formatando a data de criação
                const criacaoDate = new Date(findUserEmail[0].DT_CRIACAO_CONTA_USUARIO);
                const options = { month: 'long', year: 'numeric' };
                const criacaoFormatada = new Intl.DateTimeFormat('pt-BR', options).format(criacaoDate);
    
                req.session.logado = {
                    nome: findUserEmail[0].NOME_USUARIO,
                    email: findUserEmail[0].EMAIL_USUARIO,
                    telefone: findUserEmail[0].CELULAR_USUARIO,
                    criacao: criacaoFormatada,
                    foto:  findUserEmail[0].FOTO_USUARIO ? `data:image/jpeg;base64,${findUserEmail[0].FOTO_USUARIO.toString('base64')}` : null

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
        try {
            let results = await user.findId(req.session.logado.id);
            let campos = {
                foto_usu: results[0].FOTO_USUARIO ? `data:image/jpeg;base64,${results[0].FOTO_USUARIO.toString('base64')}` : null,
                senha_usuario: ""
            };
            
            res.render("pages/perfil", { errorsList: null, valores: campos })
        } catch (e) {
            console.log("Deu erro na renderização da imagem", e);
            res.render("pages/perfil", {
                errorsList: null, valores: {
                    foto_usu: ""
                }
            })
        }
    }
};

module.exports = userController;
