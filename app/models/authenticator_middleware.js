const { validationResult } = require("express-validator");
const user = require("./usermodel.js");
const bcrypt = require("bcryptjs");

// TA LOGADO OU NAO?
checkAuthenticatedUser = (req, res, next) => {
    if(req.session.logado){
        var logado = req.session.logado;
    }else{
        var logado = null;
    }
    next();
}


// LOGOUT - NAO FUNCIONANDO
clearSession = (req, res, next) => { // Declaração de uma função chamada 
    req.session.destroy(); // Remove todos os dados associados ao usuario. Usa a funcao da biblioteca nodejs "Destroy()"
    console.log("saiu!")
    next() // Chama a próxima função middleware na cadeia de execução.
}


recordAuthenticatedUser = async (req, res, next) => {
    console.log("Middleware recordAuthenticatedUser");

    errors = validationResult(req);
    console.log("Validation errors:", errors.array());

    if (errors.isEmpty()) {
        var dataForm = {
            EMAIL_USUARIO: req.body.email_usu,
            SENHA_USUARIO: req.body.senha_usu
        };

        console.log("Data form:", dataForm);

        var results = await user.findUserEmail(dataForm);
        console.log("Database results:", results);

        var total = Object.keys(results).length;
        console.log("Total results found:", total);

        // Verificação bem-sucedida do login
        if (total == 1 
            && bcrypt.compareSync(dataForm.SENHA_USUARIO, results[0].SENHA_USUARIO)) {
             logado = {
               nome: results[0].NOME_USUARIO,
               telefone: results[0].CELULAR_USUARIO,
               email: results[0].EMAIL_USUARIO,
               criacao: results[0].DT_CRIACAO_CONTA_USUARIO,
                
             }  // Definir o nome de usuário como logado
             console.log("Deu erro no authenticator")
        } else {
             logado = null;
        }

    } else {
        req.session.logado = null;
    }

    next();
}




// verifyAuthenticatedUser = (normaluser, destinoFalha = "partial/login") => {
//     return (req, res, next) => {
//         if (req.session.logado != null &&
//             normaluser.find(function (element) { return element == req.session.logado.tipo }) != undefined) {
//             next();
//         } else {
//             res.render(destinoFalha, req.session.logado);
//         }
//     };
// }







module.exports = {
    checkAuthenticatedUser,
    clearSession,
    recordAuthenticatedUser,
    // verifyAuthenticatedUser
}
