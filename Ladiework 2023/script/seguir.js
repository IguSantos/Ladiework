const botoesSeguir = document.querySelectorAll('.seguir');

botoesSeguir.forEach(function(botaoSeguir) {

  let seguindo = false;

  botaoSeguir.addEventListener('click', function () {
    
    if (seguindo) {
      botaoSeguir.innerText = 'SEGUIR';
      botaoSeguir.style.backgroundColor = ''
       botaoSeguir.style.color = ''
    } else {
      botaoSeguir.innerText = 'SEGUINDO';
      botaoSeguir.style.color = '#ffffff'
       botaoSeguir.style.backgroundColor = '#9f9f9f'

    }

    seguindo = !seguindo;
  });
});
