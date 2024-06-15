const progressBar = document.getElementById('current-progress');
const cardsSection = document.getElementById('cards');
const h1Title = document.querySelector('h1');
const spanElement = document.querySelector('span');

// Formulário de Mentoria
const cardMentoring = document.getElementById('card-mentoring');
const inputFieldMentory = document.getElementById('input');
const continueButtonMentory = document.getElementById('continue');
const continueButtonTwoMentory = document.getElementById('continue-two');
const continueButtonThreeMentory = document.getElementById('continue-three');
const buttonFourMentory = document.getElementById('continue-four');
const selectFieldMentory = document.getElementById('category-mentory');
const selectField2Mentory = document.getElementById('category-formation-mentory');

// Formulário de Curso
const cardCourse = document.getElementById('card-course');
const inputFieldCourse = document.getElementById('input-course');
const continueButtonCourse = document.getElementById('continue-course');
const continueButtonTwoCourse = document.getElementById('continue-two-course');
const continueButtonThreeCourse = document.getElementById('continue-three-course');
const buttonFourCourse = document.getElementById('continue-four-course');
const selectFieldCourse = document.getElementById('category-course');
const selectLevelCourse = document.getElementById('category-level');

// Função para atualizar a barra de progresso
function updateProgress(increment) {
    const currentWidth = parseFloat(progressBar.style.width || '0');
    const newWidth = currentWidth + increment;
    progressBar.style.width = `${newWidth}%`;
}

// Evento para criar Mentoria
cardMentoring.addEventListener('click', function () {
    updateProgress(20);
    cardsSection.style.display = 'none';
    continueButtonMentory.classList.remove('none');
    inputFieldMentory.classList.remove('none');
    inputFieldMentory.classList.add('input');
    h1Title.innerText = 'Dê um nome a sua mentoria';
    spanElement.style.display = 'none';
});

// Evento para criar Curso
cardCourse.addEventListener('click', function () {
    updateProgress(20);
    cardsSection.style.display = 'none';
    continueButtonCourse.classList.remove('none');
    inputFieldCourse.classList.remove('none');
    inputFieldCourse.classList.add('input');
    h1Title.innerText = 'Dê um nome ao seu curso';
    spanElement.style.display = 'none';
});

// Evento para o botão "Continuar" da Mentoria
continueButtonMentory.addEventListener('click', function () {
    const inputValue = inputFieldMentory.value.trim();

    if (inputValue === '') {
        alert('Por favor, insira uma informação no campo.');
    } else {
        inputFieldMentory.value = '';

        updateProgress(20);
        inputFieldMentory.style.display = 'none';
        selectFieldMentory.classList.remove('none');
        selectFieldMentory.classList.add('select-style');

        continueButtonMentory.classList.add('none');
        continueButtonTwoMentory.classList.remove('none');

        h1Title.innerText = 'Em qual categoria seu projeto se encaixa?';
    }
});

// Evento para o segundo botão "Continuar" da Mentoria
continueButtonTwoMentory.addEventListener('click', function () {
    selectField2Mentory.classList.remove('none');
    selectField2Mentory.classList.add('select-style');

    selectFieldMentory.classList.remove('select-style');
    selectFieldMentory.classList.add('none');

    continueButtonTwoMentory.classList.add('none');
    continueButtonThreeMentory.classList.remove('none');

    h1Title.innerText = 'Qual é a sua formação na área?';

    updateProgress(20);
});

// Evento para o terceiro botão "Continuar" da Mentoria
continueButtonThreeMentory.addEventListener('click', function () {
    h1Title.innerText = 'Quanto tempo está disposta a dedicar em seu projeto?';

    selectField2Mentory.classList.remove('select-style');
    selectField2Mentory.classList.add('none');

    document.getElementById('hours').classList.remove('none');
    document.getElementById('hours').classList.add('hours');

    continueButtonThreeMentory.classList.add('none');
    buttonFourMentory.classList.remove('none');

    updateProgress(20);
});

// Evento para finalizar Mentoria
buttonFourMentory.addEventListener('click', function () {
    window.location.href = '/';
    updateProgress(20);
});

// Evento para o botão "Continuar" do Curso
continueButtonCourse.addEventListener('click', function () {
    const inputValueC = inputFieldCourse.value.trim();

    if (inputValueC === '') {
        alert('Por favor, insira uma informação no campo.');
    } else {
        inputFieldCourse.value = '';

        updateProgress(20);
        inputFieldCourse.style.display = 'none';
        selectFieldCourse.classList.remove('none');
        selectFieldCourse.classList.add('select-style');

        continueButtonCourse.classList.add('none');
        continueButtonTwoCourse.classList.remove('none');

        h1Title.innerText = 'Em qual categoria seu curso se encaixa?';
    }
});

// Evento para o segundo botão "Continuar" do Curso
continueButtonTwoCourse.addEventListener('click', function () {
    selectLevelCourse.classList.remove('none');
    selectLevelCourse.classList.add('select-style');

    selectFieldCourse.classList.remove('select-style');
    selectFieldCourse.classList.add('none');

    continueButtonTwoCourse.classList.add('none');
    continueButtonThreeCourse.classList.remove('none');

    h1Title.innerText = 'Qual o nível do curso?';

    updateProgress(20);
});

// Evento para o terceiro botão "Continuar" do Curso
continueButtonThreeCourse.addEventListener('click', function () {
    h1Title.innerText = 'Qual será a duração do curso?';

    selectLevelCourse.classList.remove('select-style');
    selectLevelCourse.classList.add('none');

    document.getElementById('hours-course').classList.remove('none');
    document.getElementById('hours-course').classList.add('hours');

    continueButtonThreeCourse.classList.add('none');
    buttonFourCourse.classList.remove('none');

    updateProgress(20);
});

// Evento para finalizar Curso
buttonFourCourse.addEventListener('click', function () {
    window.location.href = 'cursos';
    updateProgress(20);
});
