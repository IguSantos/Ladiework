document.addEventListener('DOMContentLoaded', function() {
    const buttonsNext = document.querySelectorAll('[data-action="next"]');
    const buttonsPrev = document.querySelectorAll('[data-action="prev"]');
    const formSteps = document.querySelectorAll('.form-step');

    buttonsNext.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            
            // Verifica se estamos na primeira etapa do formulário
            if (currentStep.classList.contains('active')) {
                // Verifica se há campos vazios ou com erro na primeira etapa do formulário
                const inputs = currentStep.querySelectorAll('input, textarea');
                let hasEmptyField = false;
                let hasError = false;
                inputs.forEach(input => {
                    // Verifica se o campo está vazio
                    if (input.value.trim() === '') {
                        input.classList.add('error');
                        input.nextElementSibling.textContent = 'Este campo é obrigatório';
                        hasEmptyField = true;
                    } else {
                        input.classList.remove('error');
                        input.nextElementSibling.textContent = ''; // Remove qualquer aviso existente

                        // Verifica o nome
                        if (input.id === 'name' && (input.value.trim().length < 4 || input.value.trim().length > 45)) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'O nome deve ter entre 4 e 45 caracteres';
                            hasError = true;
                        }

                        // Verifica o email
                        if (input.id === 'email') {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(input.value.trim())) {
                                input.classList.add('error');
                                input.nextElementSibling.textContent = 'Por favor, insira um email válido';
                                hasError = true;
                            }
                        }

                        // Verifica a senha
                        if (input.id === 'password' && input.value.trim().length < 8) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'A senha deve ter no mínimo 8 caracteres';
                            hasError = true;
                        }
                    }
                });

                // Impede a transição para a próxima etapa se houver campo vazio
                if (hasEmptyField) {
                    return;
                }

                // Impede a transição para a próxima etapa se houver erro de validação
                if (hasError) {
                    return;
                }
            }
            
            const nextStep = currentStep.nextElementSibling;

            if (nextStep) {
                currentStep.classList.remove('active');
                currentStep.classList.add('hide');
                nextStep.classList.remove('hide');
                nextStep.classList.add('active');
            }
        });
    });

    buttonsPrev.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;

            if (prevStep) {
                currentStep.classList.remove('active');
                currentStep.classList.add('hide');
                prevStep.classList.remove('hide');
                prevStep.classList.add('active');
            }
        });
    });

    // Verifica o textarea na última etapa do formulário antes de enviar
    const lastStepButton = document.querySelector('.form-step:last-of-type [type="submit"]');
    const lastStepTextarea = document.getElementById('project');

    lastStepButton.addEventListener('click', function(event) {
        if (lastStepTextarea.value.trim() === '') {
            lastStepTextarea.classList.add('error');
            event.preventDefault(); // Impede o envio do formulário se o textarea estiver vazio
        }
    });

    // Verifica se o input de imagem está vazio antes de enviar o formulário
    const inputImage = document.getElementById('inputImage');
    const profileImage = document.getElementById('profileImage');

    lastStepButton.addEventListener('click', function(event) {
        if (inputImage.files.length === 0) {
            profileImage.classList.add('error');
            event.preventDefault(); // Impede o envio do formulário se o input de imagem estiver vazio
        }
    });
});

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
