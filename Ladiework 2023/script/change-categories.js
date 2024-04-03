  function alternarConteudo(id) {
    var conteudos = document.querySelectorAll('.conteudo');
    conteudos.forEach(function(conteudo) {
        conteudo.classList.remove('ativo');
    });

    var elemento = document.getElementById(id);
    elemento.classList.add('ativo');
}

document.getElementById('chat').addEventListener('click', function() {
    alternarConteudo('justChat');
});

document.getElementById('post').addEventListener('click', function() {
    alternarConteudo('justPost');
});

const isMobile = window.matchMedia("(max-width: 800px)").matches;

if (isMobile) {
   
    alternarConteudo('justPost');
}





