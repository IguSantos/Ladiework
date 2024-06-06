const { validationResult } = require("express-validator");
const usuario = require("./usermodel.js");
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

// LOGOUT
clearSession = (req, res, next) => { // Declaração de uma função chamada 
    req.session.destroy(); // Remove todos os dados associados ao usuario. Usa a funcao da biblioteca nodejs "Destroy()"
    next() // Chama a próxima função middleware na cadeia de execução.
}






module.exports = {
    checkAuthenticatedUser,
    clearSession 
}
