const cardMentoria = document.getElementById('card-mentoring');
const progressBar = document.getElementById('current-progress');
const cardsSection = document.getElementById('cards');
const continueButton = document.getElementById('continue');
const inputField = document.getElementById('input');
const h1Title = document.querySelector('h1');
const spanElement = document.querySelector('span');
const continueButtonTwo = document.getElementById('continue-two');

const currentWidth = parseFloat(progressBar.style.width || '0');

cardMentoria.addEventListener('click', function () {

    const newWidth = currentWidth + 25;

    progressBar.style.width = `${newWidth}%`;
    cardsSection.style.display = 'none';
    continueButton.classList.remove('none');
    inputField.classList.remove('none');
    inputField.classList.add('input');
    h1Title.innerText = 'Dê um nome ao seu projeto';
    spanElement.style.display = 'none';
});

continueButton.addEventListener('click', function () {
    const inputField = document.getElementById('input');
    const inputValue = inputField.value.trim();

    if (inputValue === '') {
        alert('Por favor, insira uma informação no campo.');
    } else {
        inputField.value = '';

        const currentWidth = parseFloat(progressBar.style.width || '0');
        const newWidth = currentWidth + 25;
        progressBar.style.width = `${newWidth}%`;

        inputField.style.display = 'none';

        const selectField = document.getElementById('category');
        selectField.classList.remove('none');
        selectField.classList.add('select-style');

        continueButton.classList.add('none');
        continueButtonTwo.classList.remove('none');

        h1Title.innerText = 'Em qual categoria seu projeto se encaixa?';
    }
});

continueButtonTwo.addEventListener('click', function () {
    const selectField = document.getElementById('category');
    h1Title.innerText = 'Quanto tempo está disposta a dedicar em seu projeto?';

    this.classList.add('none');
    document.getElementById('continue-three').classList.remove('none');

    selectField.classList.add('none');
    selectField.classList.remove('select-style');

    document.getElementById('hours').classList.remove('none');
    document.getElementById('hours').classList.add('hours');

    progressBar.style.width = `${parseFloat(progressBar.style.width || '0') + 25}%`;
});

document.getElementById('continue-two').addEventListener('click', function () {
    const selectField = document.getElementById('category');
    const h1Title = document.querySelector('h1');
    h1Title.innerText = 'Quanto tempo está disposta a dedicar em seu projeto?';

    this.classList.add('none');
    const buttonThree = document.getElementById('continue-three');
    buttonThree.classList.remove('none');

    selectField.classList.add('none');
    selectField.classList.remove('select-style');

    const checkbox = document.getElementById('hours');
    checkbox.classList.remove('none');
    checkbox.classList.add('hours');

    const progressBar = document.getElementById('current-progress');
    progressBar.style.width = `${parseFloat(progressBar.style.width || '0') + 25}%`;
});





