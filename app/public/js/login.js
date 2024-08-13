document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (event) {

        clearErrors();
        if (validateForm()) {
            // Obter os dados do formulário
            const formData = new FormData(form);
            const email = formData.get('email_usu');
            const password = formData.get('senha_usu');

            // Enviar os dados para o servidor
            simulateServerValidation(email, password);
        }
    });
});

function validateForm() {
    let isValid = true;

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    if (!emailField.value.trim()) {

        emailError.textContent = "O campo de e-mail não pode estar vazio.";
        emailField.classList.add('error');
        isValid = false;
    } else if (!validateEmail(emailField.value.trim())) {

        emailError.textContent = "O e-mail inserido não é válido.";
        emailField.classList.add('error');
        isValid = false;
    }

    if (!passwordField.value.trim()) {

        passwordError.textContent = "O campo de senha não pode estar vazio.";
        passwordField.classList.add('error');
        isValid = false;
    } else if (!validatePassword(passwordField.value.trim())) {

        passwordError.textContent = "Senha inválida.";
        passwordField.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
}

function clearErrors() {
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    document.getElementById("email").classList.remove('error');
    document.getElementById("password").classList.remove('error');
}

function displayServerError(message) {
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    emailError.textContent = message;
    passwordError.textContent = message;

    document.getElementById("email").classList.add('error');
    document.getElementById("password").classList.add('error');
}

function simulateServerValidation(email, password) {

    // Simula a resposta do servidor após a validação
    const serverResponse = {
        success: true, // Altere isso para false para simular erro
        message: "Senha incorreta.", // Mensagem de erro do servidor
        name: "Nome do Usuário" // Substitua isso pelo nome real do usuário obtido do servidor
    };
}


const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    new Notify({
        status: 'success',
        title: 'Login sucedido',
        text: 'Bem-vindo ao Ladiework!!',
        effect: 'slide',
        speed: 100,
        customClass: '',
        customIcon: '',
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 2000,
        notificationsGap: 20,
        notificationsPadding: null,
        type: 'outline',
        position: 'right top',
        customWrapper: '',
    })
})