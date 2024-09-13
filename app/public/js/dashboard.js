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