function openPopup() {

  document.body.classList.add('no-scroll');
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  const checkboxes = [
    document.getElementById('categoria1'),
    document.getElementById('categoria2'),
    document.getElementById('categoria3'),
    document.getElementById('categoria4'),
    document.getElementById('categoria5'),
    document.getElementById('categoria6'),
    document.getElementById('categoria7'),
    document.getElementById('categoria8'),
    document.getElementById('categoria9'),
    document.getElementById('categoria10'),
  ];

  const selectedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);

  if (selectedCheckboxes.length >= 3) {

    document.body.classList.remove('no-scroll');
    document.getElementById('popup').style.display = 'none';
  } else {
    alert('Selecione pelo menos 3 categorias!');
  }

}


window.onload = openPopup;


/* finalizar as mentorias */

function carregarERedirecionar() {
  const button = document.getElementById('continuar');
  const redirectDelay = 3000; 

  button.disabled = true;
 
  button.value = 'Carregando...';
  
  setTimeout(function () {
    button.value = 'Concluindo...';
    setTimeout(function () {
  
      window.location.href = './mentorias.html'; 
    }, 1000); 
  }, redirectDelay);
}