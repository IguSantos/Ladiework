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
            DT_CRIACAO: new Date()
        };

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/main", { pagina: "cadastro", errorsList: errors, valores: req.body });
        }


        // CRIAR USUARIO
        try {
            let create = await user.create(dataForm);
            console.log(create)
            res.redirect("/");
        } catch (e) {
            console.log(e);
            res.render("pages/main", { pagina: "home", logado: null, errorsList: errors, valores: req.body });
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

    // GIOVANNI
    logar: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("pages/main", { pagina: "login", errorsList: errors })
        }
        if (req.session.authenticated != null) {
            res.redirect("/");
        } else {
            res.render("pages/main", { pagina: "login", errorsList: errors })
        }
    }


}

module.exports = userController
