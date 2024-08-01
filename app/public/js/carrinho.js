// Aguarda o carregamento completo do documento para ativar a função
$(document).ready(function () {
    // Seleciona o ícone de lixo e, quando for clicado, ativa a função de apagar
    $('.trash-icon').click(function () {
        // Remove o elemento pai <li> da lixeira clicada, usando o closest e o remove
        $(this).closest('li').remove();
    });
});

