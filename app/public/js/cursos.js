// BARRA DE PESQUISA

function filterCourses() {
  // Obtém o valor inserido no campo de pesquisa e converte para minúsculas
  var inputText = document.getElementById('searchInput').value.toLowerCase();
  
  // Obtém todos os elementos de curso
  var courses = document.querySelectorAll('.course');

  // Percorre cada curso
  courses.forEach(function(course) {
    // Obtém o título do curso e converte para minúsculas
    var courseTitle = course.querySelector('h3').textContent.toLowerCase();
    
    // Verifica se o título do curso contém o texto de entrada
    if (courseTitle.includes(inputText)) {
      course.style.display = 'flex'; // Exibe o curso se corresponder ao filtro
    } else {
      course.style.display = 'none'; // Oculta o curso se não corresponder ao filtro
    }
  });
}

// Adiciona um ouvinte de evento para detectar a entrada de texto no campo de pesquisa
document.getElementById('searchInput').addEventListener('input', filterCourses);






// INFO CURSOS
var learnMoreButtons = document.querySelectorAll('.learn-more');

learnMoreButtons.forEach(function (button) {
    button.addEventListener('mouseover', function () {
        var courseInfo = this.parentElement.querySelector('.course-info');
        if (courseInfo) {
            courseInfo.style.display = 'block';
        }
    });
    
    button.addEventListener('mouseout', function () {
        var courseInfo = this.parentElement.querySelector('.course-info');
        if (courseInfo) {
            courseInfo.style.display = 'none';
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

// Função para filtrar os cursos com base no texto de pesquisa
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

//   FILTRAGEM LATERAL

function toggleFilter() {
    const filter = document.getElementById('background')
    filter.classList.add('show-filter')

    document.body.classList.add('no-scroll')
}

function closeFilter() {
    document.getElementById('background').classList.remove('show-filter')
    document.body.classList.remove('no-scroll')
};
