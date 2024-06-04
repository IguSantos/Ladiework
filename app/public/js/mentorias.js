// INFO CURSOS
var learnMoreButtons = document.querySelectorAll('.learn-more');

learnMoreButtons.forEach(function (button) {
  button.addEventListener('mouseover', function () {
    var article = this.closest('article'); 
    var mentoringInfo = article.querySelector('.mentoring-info');
    var buttonRect = this.getBoundingClientRect(); 

    if (mentoringInfo) {
      
      mentoringInfo.style.top = buttonRect.bottom + 'px';
      mentoringInfo.style.left = buttonRect.left + 'px';
      mentoringInfo.style.display = 'block';
    }
  });

  button.addEventListener('mouseout', function () {
    var mentoringInfo = this.parentElement.querySelector('.mentoring-info');
    if (mentoringInfo) {
      mentoringInfo.style.display = 'none';
    }
  });
});



// Adiciona um evento de clique a cada item da lista suspensa
var dropdownItems = document.querySelectorAll('.dropdown-content div');
dropdownItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var newText = this.textContent;
    var dropdownBtn = document.getElementById('dropdownBtn');
    dropdownBtn.innerHTML = newText + '<ion-icon name="caret-up-outline" style="transform: rotate(180deg)"></ion-icon>';
    dropdownOptions.style.display = 'none';
  });
});

// BARRA DE PESQUISA

function filterCourses() {
  var inputText = document.getElementById('searchInput').value.toLowerCase();
  var courses = document.querySelectorAll('.course');

  courses.forEach(function (course) {
    var courseTitle = course.querySelector('h3').textContent.toLowerCase();
    if (courseTitle.includes(inputText)) {
      course.style.display = 'flex';
    } else {
      course.style.display = 'none';
    }
  });
}

// Adiciona um evento de mudança ao campo de pesquisa
document.getElementById('searchInput').addEventListener('input', filterCourses);



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
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  let targetScroll = currentIndex * articleWidth;
  if (targetScroll > maxScroll) {
    targetScroll = maxScroll;
  }
  slider.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Inicie a rolagem automática quando a página carregar
autoScroll();
