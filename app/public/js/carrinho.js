// EXCLUIR CURSO

function removeArticle(icon) {
    icon.parentNode.remove();
}

// SLIDER

const slider = document.querySelector('.slider');
const articles = document.querySelectorAll('.slider article');
const prevButton = document.querySelector('.prevButton');
const nextButton = document.querySelector('.nextButton');

let currentIndex = 0;
let isTransitioning = false;

function nextSlide() {
    if (isTransitioning) return;
    currentIndex++;
    if (currentIndex >= articles.length) {
        currentIndex = 0;
    }
    scrollToCurrentIndex();
}

function prevSlide() {
    if (isTransitioning) return;
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = articles.length - 1;
    }
    scrollToCurrentIndex();
}

function scrollToCurrentIndex() {
    const articleWidth = articles[0].offsetWidth;
    slider.scrollTo({
        left: currentIndex * articleWidth,
        behavior: 'smooth'
    });
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Função para rolar automaticamente
function autoScroll() {
    nextSlide();
}

// Inicie a rolagem automática a cada 3 segundos
setInterval(autoScroll, 4000);