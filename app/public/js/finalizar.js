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

  pixOption.addEventListener('click', function () {
    cpfInput.value = '';
    cnpjInput.value = '';
    numeroCartaoInput.value = '';
    prazoInput.value = '';
    cvcInput.value = '';

    cpfInput.blur();
    cnpjInput.blur();
    numeroCartaoInput.blur();
    prazoInput.blur();
    cvcInput.blur();
  });

  form.addEventListener('click', function () {
    pixOption.checked = false;
  });

  proceedButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (pixOption.checked) {

      window.location.href = 'pagamentopix';
    } else {

      const cpf = cpfInput.value;
      const cnpj = cnpjInput.value;
      const numeroCartao = numeroCartaoInput.value;
      const prazo = prazoInput.value;
      const cvc = cvcInput.value;

      if (cpf && cnpj && numeroCartao && prazo && cvc) {

        alert('Compra finalizada com sucesso!');

      } else {

        alert('Por favor, preencha todos os campos do formulário.');
      }
    }
  });
});
