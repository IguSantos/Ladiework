const courseModel = require("../models/coursemodel");


const carrinho = {
    itensCarrinho: [ ],

    addItem: async (idItem, qtde, preco) => {
        
        try {
            // Verifica se o carrinho está vazio
            if (carrinho.itensCarrinho.length === 0) {
                const course = await courseModel.findID ;
                if (course.length > 0) {
                    carrinho.itensCarrinho.push({
                        "codproduto": idItem,
                        "qtde": qtde,
                        "preco": parseFloat(course[0].PRECO_CURSOS),
                        "produto": course[0].TITULO_CURSOS,
                        "imagem": course[0].FOTO_CURSOS
                    });
                }
            } else {
                let indice = carrinho.itensCarrinho.findIndex(
                    (element) => element.codproduto === idItem);
                if (indice === -1) {
                    const course = await courseModel.findID(idItem);
                    if (course.length > 0) {
                        carrinho.itensCarrinho.push({
                            "codproduto": idItem,
                            "qtde": qtde,
                            "preco": parseFloat(course[0].PRECO_CURSOS),
                            "produto": course[0].TITULO_CURSOS,
                            "imagem": course[0].FOTO_CURSOS
                        });
                    }
                } else {
                    carrinho.itensCarrinho[indice].qtde += qtde;
                }
            }
        } catch (error) {
            console.error(error);
        }
    },

    atualizarCarrinho: (req) => {
        req.session.carrinho = carrinho.itensCarrinho;
    },

    removeItem: (idItem, qtde) => {
        try {
            let indice = carrinho.itensCarrinho.findIndex(
                (element) => element.codproduto === idItem);
            if (indice !== -1) {
                carrinho.itensCarrinho[indice].qtde -= qtde;
                if (carrinho.itensCarrinho[indice].qtde <= 0) {
                    carrinho.itensCarrinho.splice(indice, 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteItem: (idItem) => {
        try {
            let indice = carrinho.itensCarrinho.findIndex(
                (element) => element.codproduto === idItem);
            if (indice !== -1) {
                carrinho.itensCarrinho.splice(indice, 1);
            }
        } catch (error) {
            console.error(error);
        }
    },

    getQtdeItens: () => {
        return carrinho.itensCarrinho.length;
    },

   
}
module.exports = { carrinho };
