const { validationResult } = require("express-validator");
const user = require("./usermodel.js");
const bcrypt = require("bcryptjs");

// TA LOGADO OU NAO?
checkAuthenticatedUser = (req, res, next) => {
    if (req.session.logado) { // Se existe uma variavel logado
        var logado = req.session.logado; // Se existir, coloca a uma variavel
    } else {
        var logado = { logado: null, id: null, tipo: null }; // Cria um objeto logado com tudo anulado
    }
    req.session.logado = logado; // Retorna o valor de logado
    next(); 
}

// LOGOUT - NAO FUNCIONANDO
clearSession = (req, res, next) => { // Declaração de uma função chamada 
    req.session.destroy(); // Remove todos os dados associados ao usuario. Usa a funcao da biblioteca nodejs "Destroy()"
    console.log("saiu!")
    next() // Chama a próxima função middleware na cadeia de execução.
}

// GIOVANNI
recordAuthenticatedUser = async (req, res, next) => {
    errors = validationResult(req)
    if (errors.isEmpty()) {
        var dataForm = {
            NOME_USUARIO: req.body.nome_usu,
            SENHA_USUARIO: req.body.senha_usu,
        };
        var results = await user.findUserEmail(dataForm);
        var total = Object.keys(results).length;
        if (total == 1) {
            if (bcrypt.compareSync(dataForm.senha_usuario, results[0].senha_usuario)) {
                var logado = {
                    logado: results[0].nome_usuario,
                    id: results[0].id_usuario,
                    tipo: results[0].tipo_usuario
                };
            }
        } else {
            var logado =  { logado: null, id: null, tipo: null };
        }
    } else {
        var logado =  { logado: null, id: null, tipo: null };
    }
    req.session.logado = logado;
    next();
}

verifyAuthenticatedUser = (normaluser, destinoFalha = "partial/login") => {
    return (req, res, next) => {
        if (req.session.logado != null &&
            normaluser.find(function (element) { return element == req.session.logado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha, req.session.logado);
        }
    };
}







module.exports = {
    checkAuthenticatedUser,
    clearSession,
    recordAuthenticatedUser,
    verifyAuthenticatedUser
}
