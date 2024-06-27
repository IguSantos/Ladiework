document.addEventListener('DOMContentLoaded', function() {
    const buttonsNext = document.querySelectorAll('[data-action="next"]');
    const buttonsPrev = document.querySelectorAll('[data-action="prev"]');
    const formSteps = document.querySelectorAll('.form-step');

    // Função para verificar se há campos vazios e desabilitar botões "Next" se necessário
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
                    nextButton.disabled = true; // Desabilita o botão "Next"
                } else {
                    nextButton.classList.remove('btn-disabled');
                    nextButton.disabled = false; // Habilita o botão "Next"
                }
            }
        });

        // Habilita sempre o botão "Prev" quando há campos preenchidos
        buttonsPrev.forEach(button => {
            button.classList.remove('btn-disabled');
            button.disabled = false; // Garante que o botão "Prev" esteja habilitado
        });
    }

    // Verifica campos vazios ao carregar a página
    checkEmptyFields();

    // Adiciona evento de click para o botão "Next"
    buttonsNext.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');

            // Verifica se estamos na primeira etapa do formulário
            if (currentStep.classList.contains('active')) {
                const inputs = currentStep.querySelectorAll('input, textarea');
                let hasEmptyField = false;
                let hasError = false;
                let passwordValue = '';

                // Verifica campos vazios ou com erro na primeira etapa do formulário
                inputs.forEach(input => {
                    // Verifica se o campo está vazio
                    if (input.value.trim() === '') {
                        input.classList.add('error');
                        input.nextElementSibling.textContent = 'Este campo é obrigatório';
                        hasEmptyField = true;
                    } else {
                        input.classList.remove('error');
                        input.nextElementSibling.textContent = ''; // Remove qualquer aviso existente

                        // Validações específicas conforme antes
                        if (input.id === 'name' && (input.value.trim().length < 4 || input.value.trim().length > 45)) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'O nome deve ter entre 4 e 45 caracteres';
                            hasError = true;
                        }

                        if (input.id === 'email') {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(input.value.trim())) {
                                input.classList.add('error');
                                input.nextElementSibling.textContent = 'Por favor, insira um email válido';
                                hasError = true;
                            } else {
                                // Verifica o domínio do email
                                const domain = input.value.trim().split('@')[1];
                                if (domain !== 'gmail.com' && domain !== 'hotmail.com') {
                                    input.classList.add('error');
                                    input.nextElementSibling.textContent = 'Apenas emails do Gmail ou Hotmail são aceitos';
                                    hasError = true;
                                }
                            }
                        }

                        if (input.id === 'password') {
                            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
                            if (!passwordPattern.test(input.value.trim())) {
                                input.classList.add('error');
                                input.nextElementSibling.textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 caractere especial e 1 número';
                                hasError = true;
                            } else {
                                input.classList.remove('error');
                                input.nextElementSibling.textContent = ''; // Remove qualquer aviso existente
                                passwordValue = input.value.trim();
                            }
                        }

                        if (input.id === 'phone' && (input.value.trim().length !== 11 || !/^\d{2}9\d{8}$/.test(input.value.trim()))) {
                            input.classList.add('error');
                            input.nextElementSibling.textContent = 'O número deve seguir o formato correto 11 9XXXXXXXX';
                            hasError = true;
                        }
                    }
                });

                // Verifica se a senha e a confirmação de senha são iguais
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
                        confirmPasswordInput.nextElementSibling.textContent = ''; // Remove qualquer aviso existente
                    }
                }

                // Impede a transição para a próxima etapa se houver campo vazio ou erro de validação
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

                // Verifica campos vazios na próxima etapa ao mudar de passo
                checkEmptyFields();
            }
        });
    });

    // Adiciona evento de click para o botão "Prev"
    buttonsPrev.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;

            if (prevStep) {
                currentStep.classList.remove('active');
                currentStep.classList.add('hide');
                prevStep.classList.remove('hide');
                prevStep.classList.add('active');

                // Verifica campos vazios no passo anterior ao mudar de passo
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




        // Impedir colagem no campo de confirmar senha
        document.getElementById('confirm-password').addEventListener('paste', function(event) {
            // Cancela o evento de colar
            event.preventDefault();
        });

        // Configuração do flatpickr para a data de nascimento
        flatpickr("#birthday-date", {
            dateFormat: "Y-m-d",
            maxDate: "2007-12-31",
            locale: "pt"
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

            // const file = event.target.files[0];


            // if (file) {
            //     const reader = new FileReader();

            //     reader.onload = (e) => {
            //         profileImage.src = e.target.result;
            //       
            //         // Salvar a imagem no localStorage
            //         localStorage.setItem('profileImageSrc', e.target.result);
            //     };

            //     reader.readAsDataURL(file);
            // }
        });
    });
