// Função que inicializa os eventos
function initializeEvents() {
    const dropdown = document.getElementById('dropdownOptions');
    const icon = document.getElementById('dropdownIcon');
  
    if (dropdown && icon) {
      dropdown.addEventListener('click', function () {
        dropdown.classList.toggle('open');
      });
  
      document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
          dropdown.classList.remove('open');
        }
      });
    }
 
  }
  
  // Executa a função initializeEvents após o carregamento do DOM
  document.addEventListener('DOMContentLoaded', initializeEvents);
  






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

function filterCoursesBySearch() {
    // Obtém todos os cursos
    const courses = document.querySelectorAll('.course');
    
    // Obtém o valor de pesquisa
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    // Filtra os cursos
    courses.forEach(course => {
        const title = course.querySelector('h3').textContent.toLowerCase();

        // Verifica se o título do curso contém o valor de pesquisa
        if (title.includes(searchValue)) {
            course.style.display = 'flex'; // Exibe o curso
        } else {
            course.style.display = 'none'; // Oculta o curso
        }
    });
}

// Adiciona um listener de evento ao campo de pesquisa
document.getElementById('searchInput').addEventListener('input', filterCoursesBySearch);


// Adiciona um evento de mudança ao campo de pesquisa


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



// // ADICIONAR NO CARRINHO
// document.addEventListener('DOMContentLoaded', () => {
//     // Função para obter o carrinho do localStorage ou inicializar um novo conjunto vazio
//     function getCartFromLocalStorage() {
//         const cartJSON = localStorage.getItem('cart');
//         return cartJSON ? new Set(JSON.parse(cartJSON)) : new Set();
//     }

//     // Função para salvar o carrinho no localStorage
//     function saveCartToLocalStorage(cart) {
//         localStorage.setItem('cart', JSON.stringify(Array.from(cart)));
//     }

//     let cart = getCartFromLocalStorage();
//     const cartIndicator = document.querySelector('.count-indicator');

//     function updateCartIndicator() {
//         cartIndicator.textContent = cart.size;
//         if (cart.size === 0) {
//             cartIndicator.classList.add('hidden');
//         } else {
//             cartIndicator.classList.remove('hidden');
//         }
//         saveCartToLocalStorage(cart); // Salva o carrinho no localStorage após atualizar o indicador
//     }

//     function toggleCartItem(event) {
//         const button = event.currentTarget;
//         const courseId = button.getAttribute('data-id');
//         const icon = button.querySelector('ion-icon[name="add-outline"], ion-icon[name="remove-outline"]');

//         if (cart.has(courseId)) {
//             cart.delete(courseId);
//             icon.setAttribute('name', 'add-outline');
//         } else {
//             cart.add(courseId);
//             icon.setAttribute('name', 'remove-outline');
//         }

//         updateCartIndicator();
//     }

//     const addCartButtons = document.querySelectorAll('.add-cart');
//     addCartButtons.forEach(button => {
//         button.addEventListener('click', toggleCartItem);
//     });

//     updateCartIndicator(); // Inicializa o contador ao carregar a página
// });
