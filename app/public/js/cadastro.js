let currentStep = 0;

const form = document.querySelector('form');
const formSteps = document.querySelectorAll('.form-step');

form.addEventListener('click', (e) => {
    if (!e.target.matches("[data-action]")) {
        return;
    }

    const actions = {
        next() {

            if (!isValidInput()) {
                return
            }

            currentStep++
        },
        prev() {
            currentStep--
        }
    }

    const action = e.target.dataset.action;
    actions[action]()

    updateActiveStep()
    updateProgressStep()

}

);

form.addEventListener("submit", (e) => {
    e.preventDefault()


    const data = new formData(form)
    alert(`Obrigado ${data.get('name')}`)
})

/* PASSAR PARA O PROXIMO FORMS */

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'))
    formSteps[currentStep].classList.add('active')
}

const progressSteps = document.querySelectorAll('.step-progress [data-step]');
function updateProgressStep() {
    progressSteps.forEach((step, idx) => {
        step.classList.remove('active')
        step.classList.remove('done')

        if (idx < currentStep + 1) {
            step.classList.add("active")

        }

        if (idx < currentStep) {
            step.classList.add("done")
        }
    })

}

/* VALIDACAO */

function isValidInput() {    
    const currentFormStep = formSteps[currentStep]
    const formField = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]
    const result = formField.every((input) => !input ? false : true)
    

    return result;

}

formSteps.forEach(formStep => {
    function hide() {
        formStep.classList.add('hide')
    };

    formStep.addEventListener('animationend', ()=> {
        hide()
        formSteps[currentStep].classList.remove("hide")
    })
})



const limiteIdade = 17;
const dataAtual = new Date();
const anoLimite = dataAtual.getFullYear() - limiteIdade;
const mesLimite = dataAtual.getMonth() + 1; // Mês atual
const diaLimite = dataAtual.getDate(); // Dia atual

// Formata a data limite no formato aceito pelo atributo max (YYYY-MM-DD)
const dataLimite = `${anoLimite}-${mesLimite < 10 ? '0' + mesLimite : mesLimite}-${diaLimite < 10 ? '0' + diaLimite : diaLimite}`;

// Define o valor máximo do input date
document.getElementById('birthday-date').setAttribute('max', dataLimite);

const inputImage = document.getElementById('inputImage');
const profileImage = document.getElementById('profileImage');
const miniPerfil = document.getElementById('editar');


miniPerfil.addEventListener('click', () => {
    inputImage.click();
});

// Quando uma nova imagem é selecionada, atualizamos a imagem de perfil
inputImage.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});


