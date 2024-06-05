const user = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const userController = {

    // REGRAS DE CADASTRO + MENSAGENS
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
        body("desc_usu")
            .isLength({ min: 10, max: 45 }).withMessage("Mínimo de 10 letras e máximo de 45!"),

    ],

    validationRulesFormLogin: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 })
            .withMessage("O nome de usuário deve ter de 4 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 4 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    // ?

    cadastrar: (req, res) => {
        const errors = validationResult(req);
        console.log(errors);

        // GUARDAR INFORMAÇÕES DO CADASTRO
        var dataForm = {
            NOME_USUARIO: req.body.nome_usu,
            SENHA: bcrypt.hashSync(req.body.senha_usu, salt),
            EMAIL_USUARIO: req.body.email_usu,
            FOTO_USUARIO: req.body.foto_usu,
            GENERO: req.body.genero_usu,
            DESCRICAO_USUARIO: req.body.desc_usu,
            CELULAR_USUARIO: req.body.telefone_usu
        };
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/cadastro", { listaErros: errors, valores: req.body })
        }

        // CRIAR USUARIO
        try {
            let create = user.create(dataForm);
            res.redirect("/")
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", { listaErros: errors, valores: req.body })
        }
    },

   // GIOVANNI
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
    }


}

module.exports = userController
