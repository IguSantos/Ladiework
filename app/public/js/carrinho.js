// Aguarda o carregamento completo do documento
$(document).ready(function() {
    // Adiciona um evento de clique para o ícone da lixeira
    $('.trash-icon').click(function() {
        // Remove o elemento pai (li) da lixeira clicada
        $(this).closest('li').remove();
    });
});
