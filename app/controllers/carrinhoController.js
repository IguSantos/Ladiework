const { carrinho } = require("../util/carrinho");

const carrinhoController = {

    addItem: (req, res) => {
        try {
            let id = req.query.id;
            let preco = req.query.preco;
            carrinho.addItem(id, 1, preco);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == "" ? "/" : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                errorList: erros, dadosNotificacao: {
                    titulo: "Erro ao adicionar o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    }, 

    removeItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.removeItem(id, qtde);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == ""
                ? "/"
                : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                listErrors: erros, dadosNotificacao: {
                    titulo: "Erro ao remover o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },

    deleteItem: (req, res) => {
        try {
            let id = req.query.id;
            let qtde = req.query.qtde;
            carrinho.deleteItem(id);
            carrinho.atualizarCarrinho(req);
            let caminho = req.get('Referer').split("/")[3] == ""
                ? "/"
                : "/" + req.get('Referer').split("/")[3];
            res.redirect(caminho);
        } catch (e) {
            console.log(e);
            res.render("pages/index", {
                listErrors: erros, dadosNotificacao: {
                    titulo: "Erro ao excluir o item!",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },

    listcart: (req, res) => {
        try {
            carrinho.atualizarCarrinho(req);
            res.render("pages/main", { pagina: "carrinho", logado: null, dadosNotificacao: null });
        } catch (e) {
            console.log(e);
            res.render("pages/main", {
                pagina: "carrinho",
                logado: req.session.logado,
                carrinho: null,
                listErrors: null,
                dadosNotificacao: {
                    titulo: "Falha ao Listar Itens !",
                    mensagem: "Tente novamente mais tarde!",
                    tipo: "error"
                }
            })
        }
    },
}

module.exports = { carrinhoController }