const user = require("../models/usermodel");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const userController = {

    // REGRAS DE CADASTRO
    validationRulesFormCad: [
        body("nome_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Mínimo de 3 letras e máximo de 45!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),
        body("aniversario_usu")
            .isDate("DD/MM/YYYY").withMessage("Coloque sua data de aniversário!"),
        body("numero_usu")
            .isMobilePhone("pt-BR", { min: 10, max: 10 }).withMessage("Coloque seu número de telefone correto!"),
        body("genero_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Mínimo de 3 letras e máximo de 45!"),

    ],

    validationRulesFormLogin: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 })
            .withMessage("O nome de usuário deve ter de 4 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 4 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    logar: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("pages/login", { errorList: errors })
        }
        if (req.session.authenticated != null) {
            res.redirect("/");
        } else {
            res.render("pages/login", { errorList: errors })
        }
    },

    cadastrar: (req, res) => {
        const erros = validationResult(req);
        console.log(erros);
        var dadosForm = {
            user_usuario: req.body.nomeusu_usu,
            senha_usuario: bcrypt.hashSync(req.body.senha_usu, salt),
            nome_usuario: req.body.nome_usu,
            email_usuario: req.body.email_usu,
        };
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/cadastro", { listaErros: erros, valores: req.body })
        }
        try {
            let create = user.create(dadosForm);
            res.redirect("/")
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", { listaErros: erros, valores: req.body })
        }
    }
}

module.exports = userController
