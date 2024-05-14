function toggleForm(formId) {
  var form = document.getElementById(formId);
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var modulos = document.querySelectorAll('.card');

  modulos.forEach(function (modulo) {
    modulo.addEventListener('click', function (event) {
      if (!event.target.matches('input[type="text"]') && !event.target.matches('input[type="number"]')) {
        var cardInfo = this.querySelector('.card-info');
        toggleDisplay(cardInfo);

        var outrosModulos = document.querySelectorAll('.card');
        outrosModulos.forEach(function (anotherModule) {
          if (anotherModule !== modulo) {
            var outrasAulas = anotherModule.querySelector('.card-info');
            outrasAulas.style.display = 'none';
          }
        });
      }
    });
  });
});

function toggleDisplay(element) {
  element.style.display = (element.style.display === "none") ? "block" : "none";
}


function toggleDisplay(element) {
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}


// ROTA PARA AS PÁGINAS

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.card-info');
  const pixOption = document.getElementById('pix');
  const proceedButton = document.querySelector('.proceed');
  const cpfInput = form.querySelector('#cpf');
  const cnpjInput = form.querySelector('#cnpj');
  const numeroCartaoInput = form.querySelector('#numero-cartao');
  const prazoInput = form.querySelector('#prazo');
  const cvcInput = form.querySelector('#cvc');

  // Adiciona um evento de clique ao campo de seleção do Pix
  pixOption.addEventListener('click', function () {
      // Se a opção Pix for selecionada, limpa os campos do formulário de cartão de crédito/débito
      cpfInput.value = '';
      cnpjInput.value = '';
      numeroCartaoInput.value = '';
      prazoInput.value = '';
      cvcInput.value = '';

      // Remove o foco dos campos do formulário de cartão de crédito/débito
      cpfInput.blur();
      cnpjInput.blur();
      numeroCartaoInput.blur();
      prazoInput.blur();
      cvcInput.blur();
  });

  // Adiciona um evento de clique ao formulário de cartão de crédito/débito
  form.addEventListener('click', function () {
      // Se o formulário de cartão de crédito/débito for clicado, desmarca a opção Pix
      pixOption.checked = false;
  });

  // Adiciona um evento de clique ao botão "Prosseguir"
  proceedButton.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que o formulário seja enviado automaticamente

      // Verifica se a opção de pagamento Pix está selecionada
      if (pixOption.checked) {
          // Se o Pix estiver selecionado, redirecione para a página de pagamento Pix
          window.location.href = 'pagamentopix'; // Substitua 'pagamentopix' pelo URL real da sua página de pagamento Pix
      } else {
          // Caso contrário, verifique se todos os campos do formulário de cartão de crédito/débito estão preenchidos
          const cpf = cpfInput.value;
          const cnpj = cnpjInput.value;
          const numeroCartao = numeroCartaoInput.value;
          const prazo = prazoInput.value;
          const cvc = cvcInput.value;

          if (cpf && cnpj && numeroCartao && prazo && cvc) {
              // Todos os campos estão preenchidos, então finalize a compra
              alert('Compra finalizada com sucesso!');
              // Aqui você pode redirecionar o usuário para outra página ou executar outra ação
          } else {
              // Caso contrário, exiba uma mensagem de erro ou destaque os campos que precisam ser preenchidos
              alert('Por favor, preencha todos os campos do formulário.');
          }
      }
  });
});