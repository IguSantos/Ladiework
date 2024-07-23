const fs = require("fs");

function removeImg(caminho) {
    fs.unlink('app/public/' + caminho, function (err) {
        if (err && err.code == 'ENOENT') {
            console.log("Arquivo não existe e não foi possivel apagar!!");
            return false;
        } else if (err) {
            console.log("Erro genérico ao remover a imagem");
            return false;
        } else {
            return true;
        }
    });
}

module.exports = { removeImg }