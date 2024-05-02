
let currentStep = 0;

const form = document.querySelector('form');
const formSteps = document.querySelectorAll('.form-step');

form.addEventListener('click', (e) => {
    if (!e.target.matches("[data-action]")) {
        return;
    }

    const actions = {
        next() {
            const emailInput = document.getElementById('email').value;
            
            // Verifique se o email não termina com "@gmail.com"
            if (!emailInput.endsWith('@gmail.com')) {
                // Se o email não for válido, mostre uma mensagem de erro e não permita que o usuário avance
                alert('Por favor, insira um endereço de e-mail válido com "@gmail.com".');
                return;
            }
            
            // Se o email for válido, continue para o próximo passo do formulário
            currentStep++;
            updateActiveStep();
            updateProgressStep();
        },
        prev() {
            currentStep--;
            updateActiveStep();
            updateProgressStep();
        }
    };

    const action = e.target.dataset.action;
    actions[action]();

});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    // Salvando os dados no localStorage
    for (const [key, value] of data.entries()) {
        localStorage.setItem(key, value);
    }

    // Mudando o layout para exibir o perfil
    form.classList.add('hide');
    document.querySelector('.profile').classList.add('active');
});

/* PASSAR PARA O PRÓXIMO FORMULÁRIO */

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'));
    formSteps[currentStep].classList.add('active');
}

const progressSteps = document.querySelectorAll('.step-progress [data-step]');
function updateProgressStep() {
    progressSteps.forEach((step, idx) => {
        step.classList.remove('active');
        step.classList.remove('done');

        if (idx < currentStep + 1) {
            step.classList.add("active");
        }

        if (idx < currentStep) {
            step.classList.add("done");
        }
    });
}

/* VALIDAÇÃO */

function isValidInput() {
    const currentFormStep = formSteps[currentStep];
    const formField = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')];
    const result = formField.every((input) => input.value.trim() !== '');

    return result;
}

document.querySelector('[data-action="next"]').addEventListener('click', function() {
    const emailInput = document.getElementById('email').value;
    
    // Verifique se o email não termina com "@gmail.com"
    if (!emailInput.endsWith('@gmail.com')) {
        // Se o email não for válido, mostre uma mensagem de erro e não permita que o usuário avance
        alert('Por favor, insira um endereço de e-mail válido com "@gmail.com".');
        return;
    }
    
    // Se o email for válido, continue para o próximo passo do formulário
    actions['next']();
});

formSteps.forEach(formStep => {
    function hide() {
        formStep.classList.add('hide');
    }

    formStep.addEventListener('animationend', () => {
        hide();
        formSteps[currentStep].classList.remove("hide");
    });
});

// Carregar os dados salvos no localStorage e exibir no perfil
window.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const bio = localStorage.getItem('bio');
    const profileImageSrc = localStorage.getItem('profileImageSrc');

    if (name && email && bio && profileImageSrc) {
        // Preencher os campos do perfil
        document.getElementById('profileName').textContent = name;
        document.getElementById('profileEmail').textContent = email;
        document.getElementById('profileBio').textContent = bio;
        document.getElementById('profileImage').src = profileImageSrc;

        // Mostrar o perfil
        form.classList.add('hide');
        document.querySelector('.profile').classList.add('active');
    }
});

// Adicionar evento de envio de imagem
const inputImage = document.getElementById('inputImage');
const profileImage = document.getElementById('profileImage');
const miniPerfil = document.getElementById('editar');

miniPerfil.addEventListener('click', () => {
    inputImage.click();
});

inputImage.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            profileImage.src = e.target.result;
            // Salvar a imagem no localStorage
            localStorage.setItem('profileImageSrc', e.target.result);
        };

        reader.readAsDataURL(file);
    }
});

// Adicione este código ao seu JavaScript após o código existente

// Função para atualizar o cabeçalho após o login
function updateHeaderAfterLogin() {
    // Esconder os botões de login e cadastro
    document.querySelector('.enter').style.display = 'none';
    // Mostrar a imagem do perfil
    document.getElementById('profileImage').style.display = 'inline-block';
    // Redirecionar para a página inicial após o login
    window.location.href = '/';
}

// Adicione um ouvinte de evento aos botões de login e cadastro para chamar a função updateHeaderAfterLogin()
document.querySelector('.login-mobile').addEventListener('click', updateHeaderAfterLogin);
document.querySelector('.sign-in').addEventListener('click', updateHeaderAfterLogin);





