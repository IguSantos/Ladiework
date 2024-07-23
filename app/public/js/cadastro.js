document.addEventListener('DOMContentLoaded', function() {
    
    const buttonsNext = document.querySelectorAll('[data-action="next"]');
    const buttonsPrev = document.querySelectorAll('[data-action="prev"]');
    const formSteps = document.querySelectorAll('.form-step');

    // Função para verificar se o email já existe no backend
    async function checkEmailExists(email) {
        try {
            const response = await fetch('/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_usu: email }) // Certifique-se de que o nome do campo corresponde
            });
            const result = await response.json();
            return result.exists;
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }

    // Função para verificar se há campos vazios e aplicar estilos de botão
    function checkEmptyFields() {
        formSteps.forEach(step => {
            const inputs = step.querySelectorAll('input, textarea');
            let hasEmptyField = false;

            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    hasEmptyField = true;
                }
            });

            const nextButton = step.querySelector('[data-action="next"]');
            if (nextButton) {
                if (hasEmptyField) {
                    nextButton.classList.add('btn-disabled');
                    nextButton.disabled = true;
                } else {
                    nextButton.classList.remove('btn-disabled');
                    nextButton.disabled = false;
                }
            }
        });

        buttonsPrev.forEach(button => {
            button.classList.remove('btn-disabled');
            button.disabled = false;
        });
    }

    // Inicialmente verifica os campos vazios
    checkEmptyFields();

    // Função para validar senha e mostrar feedback imediato
    function validatePassword(input) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        const errorMessage = 'A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 caractere especial e 1 número';
        
        if (!passwordPattern.test(input.value.trim())) {
            input.classList.add('error');
            input.nextElementSibling.textContent = errorMessage;
            return false;
        } else {
            input.classList.remove('error');
            input.nextElementSibling.textContent = '';
            return true;
        }
    }

    // Adiciona evento de input no campo de senha
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(passwordInput);
        });
    }

    // Função para validar email e mostrar feedback imediato
    function validateEmail(input) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domainPattern = /@(gmail|hotmail)\.com$/;
        const errorMessage = 'Por favor, insira um email válido';
        const domainErrorMessage = 'O email deve ser do domínio gmail.com ou hotmail.com';

        if (!emailPattern.test(input.value.trim())) {
            input.classList.add('error');
            input.nextElementSibling.textContent = errorMessage;
            return false;
        } else if (!domainPattern.test(input.value.trim())) {
            input.classList.add('error');
            input.nextElementSibling.textContent = domainErrorMessage;
            return false;
        } else {
            input.classList.remove('error');
            input.nextElementSibling.textContent = '';
            return true;
        }
    }

    // Adiciona evento de input no campo de email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(emailInput);
        });
    }

    // Adiciona evento de clique nos botões de próximo
    buttonsNext.forEach(button => {
        button.addEventListener('click', async function() {
            const currentStep = this.closest('.form-step');

            if (currentStep.classList.contains('active')) {
                const inputs = currentStep.querySelectorAll('input, textarea');
                let hasEmptyField = false;
                let hasError = false;
                let passwordValue = '';

                // Validação básica de campos vazios e outros critérios
                for (let input of inputs) {
                    if (input.value.trim() === '') {
                        input.classList.add('error');
                        input.nextElementSibling.textContent = 'Este campo é obrigatório';
                        hasEmptyField = true;
                    } else {
                        input.classList.remove('error');
                        input.nextElementSibling.textContent = '';

                        // Validações específicas como email, senha, etc.
                        if (input.id === 'email') {
                            if (!validateEmail(input)) {
                                hasError = true;
                            } else {
                                // Verificar se o email já está em uso
                                const emailExists = await checkEmailExists(input.value.trim()); // Adicione `await` aqui
                                if (emailExists) {
                                    input.classList.add('error');
                                    input.nextElementSibling.textContent = 'Este email já está em uso';
                                    hasError = true;
                                }
                            }
                        }

                        if (input.id === 'password') {
                            if (!validatePassword(input)) {
                                hasError = true;
                            } else {
                                passwordValue = input.value.trim();
                            }
                        }

                        if (input.id === 'phone' && (input.value.trim().length !== 11 || !/^\d{2}9\d{8}$/.test(input.value.trim()))) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'O número deve seguir o formato correto 11 9XXXXXXXX';
                            hasError = true;
                        }
                    }
                }

                const confirmPasswordInput = currentStep.querySelector('#confirm-password');
                if (confirmPasswordInput) {
                    if (confirmPasswordInput.value.trim() === '') {
                        confirmPasswordInput.classList.add('error');
                        confirmPasswordInput.nextElementSibling.textContent = 'Confirme sua senha';
                        hasError = true;
                    } else if (confirmPasswordInput.value.trim() !== passwordValue) {
                        confirmPasswordInput.classList.add('error');
                        confirmPasswordInput.nextElementSibling.textContent = 'As senhas não coincidem';
                        hasError = true;
                    } else {
                        confirmPasswordInput.classList.remove('error');
                        confirmPasswordInput.nextElementSibling.textContent = '';
                    }
                }

                if (hasEmptyField || hasError) {
                    return;
                }
            }

            const nextStep = currentStep.nextElementSibling;

            if (nextStep) {
                currentStep.classList.remove('active');
                currentStep.classList.add('hide');
                nextStep.classList.remove('hide');
                nextStep.classList.add('active');

                checkEmptyFields();
            }
        });
    });

    // Adiciona evento de clique nos botões de voltar
    buttonsPrev.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;

            if (prevStep) {
                currentStep.classList.remove('active');
                currentStep.classList.add('hide');
                prevStep.classList.remove('hide');
                prevStep.classList.add('active');

                checkEmptyFields();
            }
        });
    });

    // Adiciona evento de input para verificar campos vazios dinamicamente
    formSteps.forEach(step => {
        const inputs = step.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                checkEmptyFields();
            });
        });
    });

    // Impede a colagem no campo de confirmar senha
    document.getElementById('confirm-password').addEventListener('paste', function(event) {
        // Cancela o evento de colar
        event.preventDefault();
    });

    // Configuração do flatpickr para a data de nascimento
    flatpickr("#birthday-date", {
        dateFormat: "Y-m-d",
        maxDate: "2007-12-31",
        locale: {
            firstDayOfWeek: 0, // Domingo como primeiro dia da semana
            weekdays: {
                shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                longhand: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            },
            months: {
                shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            },
            rangeSeparator: ' até ',
            weekAbbreviation: 'Sem.',
            scrollTitle: 'Rolagem para aumentar',
            toggleTitle: 'Clique para alternar',
        }
    });

 

    

    // Evento para alterar a imagem de perfil
    const inputImage = document.getElementById('inputImage');
    const profileImage = document.getElementById('profileImage');
    const miniPerfil = document.getElementById('editar');

    miniPerfil.addEventListener('click', () => {
        inputImage.click();
    });

    inputImage.addEventListener('change', (event) => {
        profileImage.src = URL.createObjectURL(event.target.files[0]);
    });

    
});
