const cardMentoring = document.getElementById('card-mentoring');
const progressBar = document.getElementById('current-progress');
const cardsSection = document.getElementById('cards');
const inputField = document.getElementById('input');
const h1Title = document.querySelector('h1');
const spanElement = document.querySelector('span');
const continueButton = document.getElementById('continue');
const continueButtonTwo = document.getElementById('continue-two');
const continueButtonThree = document.getElementById('continue-three');
const buttonFour = document.getElementById('continue-four');
const selectField = document.getElementById('category');
const selectField2 = document.getElementById('category-formation');
const cardCourse = document.getElementById('card-course');


const currentWidth = parseFloat(progressBar.style.width || '0');


// PÁGINA DE CRIAR TTULO

cardMentoring.addEventListener('click', function () {

    const newWidth = currentWidth + 20;

    progressBar.style.width = `${newWidth}%`;
    cardsSection.style.display = 'none';
    continueButton.classList.remove('none');
    inputField.classList.remove('none');
    inputField.classList.add('input');
    h1Title.innerText = 'Dê um nome a sua mentoria';
    spanElement.style.display = 'none';
});

// SELECT CATEGORIA

continueButton.addEventListener('click', function () {
    const inputField = document.getElementById('input');
    const inputValue = inputField.value.trim();

    if (inputValue === '') {
        alert('Por favor, insira uma informação no campo.');
    } else {
        inputField.value = '';

        const currentWidth = parseFloat(progressBar.style.width || '0');
        const newWidth = currentWidth + 20;
        progressBar.style.width = `${newWidth}%`;

        inputField.style.display = 'none';

        selectField.classList.remove('none');
        selectField.classList.add('select-style');

        continueButton.classList.add('none');
        continueButtonTwo.classList.remove('none');

        h1Title.innerText = 'Em qual categoria seu projeto se encaixa?';
    }
});

// SELECT FORMAÇÃO

continueButtonTwo.addEventListener('click', function () {
    selectField2.classList.remove('none');
    selectField2.classList.add('select-style');

    selectField.classList.remove('select-style');
    selectField.classList.add('none');

    continueButtonTwo.classList.add('none');
    continueButtonThree.classList.remove('none');

    h1Title.innerText = 'Qual é a sua formação na área?';

    const currentWidth = parseFloat(progressBar.style.width || '0');
    const newWidth = currentWidth + 20;
    progressBar.style.width = `${newWidth}%`;
});

// CHECKBOX TEMPO

continueButtonThree.addEventListener('click', function () {
    const selectField = document.getElementById('category');
    h1Title.innerText = 'Quanto tempo está disposta a dedicar em seu projeto?';

    selectField2.classList.remove('select-style');
    selectField2.classList.add('none');

    this.classList.add('none');
    document.getElementById('continue-three').classList.remove('none');

    selectField.classList.add('none');
    selectField.classList.remove('select-style');

    document.getElementById('hours').classList.remove('none');
    document.getElementById('hours').classList.add('hours');

    continueButtonThree.classList.add('none');
    buttonFour.classList.remove('none');

    const currentWidth = parseFloat(progressBar.style.width || '0');
    const newWidth = currentWidth + 20;
    progressBar.style.width = `${newWidth}%`;

});

// FINALIZAÇÃO

document.getElementById('continue-four').addEventListener('click', function () {
    window.location.href = '/'

    progressBar.style.width = `${parseFloat(progressBar.style.width || '0') + 20}%`;
});




// ============  PÁGINA DE CRIAR CURSOS =====================


const continueButtonCourse = document.getElementById('continue-course');
const continueButtonTwoCourse = document.getElementById('continue-two-course');
const continueButtonThreeCourse = document.getElementById('continue-three-course');
const buttonFourCourse = document.getElementById('continue-four-course');
const inputCourse = document.getElementById('input-course');
const selectLevel = document.getElementById('category-level');


cardCourse.addEventListener('click', function () {

    const newWidth = currentWidth + 20;

    progressBar.style.width = `${newWidth}%`;
    cardsSection.style.display = 'none';
    continueButtonCourse.classList.remove('none');
    inputCourse.classList.remove('none');
    inputCourse.classList.add('input');
    h1Title.innerText = 'Dê um nome a seu curso!';
    spanElement.style.display = 'none';

    continueButtonCourse.addEventListener('click', function () {
        const inputValueC = inputCourse.value.trim();

        if (inputValueC === '') {
            alert('Por favor, insira uma informação no campo.');
        } else {
            inputCourse.value = '';

            const currentWidth = parseFloat(progressBar.style.width || '0');
            const newWidth = currentWidth + 20;
            progressBar.style.width = `${newWidth}%`;

            inputCourse.style.display = 'none';

            selectField.classList.remove('none');
            selectField.classList.add('select-style');

            continueButtonCourse.classList.add('none');
            continueButtonTwoCourse.classList.remove('none');

            h1Title.innerText = 'Em qual categoria seu curso se encaixa?';
        }
    });


    continueButtonTwoCourse.addEventListener('click', function () {
        selectLevel.classList.remove('none');
        selectLevel.classList.add('select-style');

        selectField.classList.remove('select-style');
        selectField.classList.add('none');

        continueButtonTwoCourse.classList.add('none');
        continueButtonThreeCourse.classList.remove('none');

        h1Title.innerText = 'Qual o nivel do curso?';

        const currentWidth = parseFloat(progressBar.style.width || '0');
        const newWidth = currentWidth + 20;
        progressBar.style.width = `${newWidth}%`;
    });



    continueButtonThreeCourse.addEventListener('click', function () {
        const selectField = document.getElementById('category');
        h1Title.innerText = 'Qual será a duração do curso?';

        selectLevel.classList.remove('select-style');
        selectLevel.classList.add('none');


        this.classList.add('none');
        continueButtonThreeCourse.classList.remove('none');

        selectField.classList.add('none');
        selectField.classList.remove('select-style');

        document.getElementById('hours-course').classList.remove('none');
        document.getElementById('hours-course').classList.add('hours');

        continueButtonThreeCourse.classList.add('none');
        buttonFourCourse.classList.remove('none');

        const currentWidth = parseFloat(progressBar.style.width || '0');
        const newWidth = currentWidth + 20;
        progressBar.style.width = `${newWidth}%`;

    });


    buttonFourCourse.addEventListener('click', function () {
        window.location.href = 'cursos'

        progressBar.style.width = `${parseFloat(progressBar.style.width || '0') + 20}%`;
    });
});









