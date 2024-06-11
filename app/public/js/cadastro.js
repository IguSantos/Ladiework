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
                        if (input.id === 'password') {
                            const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
                            if (!passwordPattern.test(input.value.trim())) {
                                input.classList.add('error');
                                input.nextElementSibling.textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 caractere especial e 1 número';
                                hasError = true;
                            }
                        }

                        // Verifica o número
                        if (input.id === 'phone' && (input.value.trim().length !== 11 || !/^\d{2}9\d{8}$/.test(input.value.trim()))) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'O número deve seguir o formato correto 11 9XXXXXXXX';
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

   
});







const inputImage = document.getElementById('inputImage');
const profileImage = document.getElementById('profileImage');
const miniPerfil = document.getElementById('editar');
const profilePhoto = document.getElementById('profile-photo'); // adicionando a referência ao elemento 'profile-photo'

miniPerfil.addEventListener('click', () => {
    inputImage.click();
});

inputImage.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            profileImage.src = e.target.result;
            profilePhoto.src = e.target.result; // atualizando a imagem 'profile-photo' com a nova foto de perfil
            // Salvar a imagem no localStorage
            localStorage.setItem('profileImageSrc', e.target.result);
        };

        reader.readAsDataURL(file);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#birthday-date", {
        dateFormat: "Y-m-d",
        maxDate: "2007-12-31",
    });
});





