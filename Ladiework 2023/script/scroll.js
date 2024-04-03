

    const scrollToTopButton = document.getElementById("scrollToTopBtn");

// Mostra ou oculta o botão "Voltar para o topo" conforme a posição de rolagem
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 250) { // Ajuste este valor conforme necessário
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
});

// Role suavemente para o topo quando o botão for clicado
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});









