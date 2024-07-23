document.addEventListener('DOMContentLoaded', function() {
    const mentoringButton = document.getElementById('mentoring-button');
    const coursesButton = document.getElementById('courses-button');
    const mentoringContent = document.getElementById('main-content-mentoring');
    const coursesContent = document.getElementById('main-content-courses');
    const title = document.getElementById('purchased-title');
  
    mentoringButton.addEventListener('click', function() {
      showSection(mentoringContent);
      hideSection(coursesContent);
      title.textContent = '- Mentorias -';
  
      mentoringButton.classList.add('selected');
      coursesButton.classList.remove('selected');
    });
  
    coursesButton.addEventListener('click', function() {
      showSection(coursesContent);
      hideSection(mentoringContent);
      title.textContent = '- Cursos -';
  
      coursesButton.classList.add('selected');
      mentoringButton.classList.remove('selected');
    });
  
    // Função para mostrar seção com animação
    function showSection(section) {
      section.classList.remove('none');
      fadeInCards(section.querySelectorAll('.card'));
    }
  
    // Função para esconder seção
    function hideSection(section) {
      section.classList.add('none');
    }
  
    // Função para animar fade-in dos cards
    function fadeInCards(cards) {
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease';
          card.style.opacity = '1';
        }, index * 400); // Intervalo de 200ms entre cada card
      });
    }
  });
  