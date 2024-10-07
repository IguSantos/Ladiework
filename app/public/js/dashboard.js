document.addEventListener("DOMContentLoaded", function() {
  const homeSection = document.getElementById("home");
  const editFormSection = document.getElementById("edit-form");
  const mentoriasLink = document.getElementById("mentorias");
  const inicioLink = document.getElementById("inicio");

  // Exibir seção de edição e ocultar home
  mentoriasLink.addEventListener("click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    homeSection.style.display = "none";
    editFormSection.classList.remove("hidden");
  });

  // Exibir home e ocultar seção de edição
  inicioLink.addEventListener("click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    editFormSection.classList.add("hidden");
    homeSection.style.display = "grid"; // Ou a configuração original que você tem
  });
});

const thumbnailInput = document.getElementById('thumbnail');
const thumbnailPreview = document.getElementById('thumbnail-preview');

thumbnailInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      thumbnailPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("price").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, ''); // Remove qualquer caractere não numérico
});