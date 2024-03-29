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



// FILTRO

document.getElementById('dropdownBtn').addEventListener('click', function () {
    // Mostra ou oculta a lista de opções
    var dropdownOptions = document.getElementById('dropdownOptions');
    dropdownOptions.style.display = dropdownOptions.style.display === 'none' ? 'block' : 'none';
    // Seleciona o ícone dentro do botão
    var icon = document.querySelector('#dropdownBtn ion-icon');
    // Inverte a rotação do ícone
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
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
