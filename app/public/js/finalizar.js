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



