
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', function(event) {
        // Prevent form from submitting immediately
        event.preventDefault();
        
        // Clear previous errors
        clearErrors();

        // Validate form
        if (validateForm()) {
            // If validation passes, simulate server-side validation
            simulateServerValidation();
        }
    });
});

function validateForm() {
    let isValid = true;

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Check if email field is empty
    if (!emailField.value.trim()) {
        emailError.textContent = "O campo de e-mail não pode estar vazio.";
        emailField.classList.add('error');
        isValid = false;
    } else if (!validateEmail(emailField.value.trim())) {
        emailError.textContent = "Por favor, insira um e-mail válido.";
        emailField.classList.add('error');
        isValid = false;
    } else {
        emailField.classList.remove('error');
    }

    // Check if password field is empty
    if (!passwordField.value.trim()) {
        passwordError.textContent = "O campo de senha não pode estar vazio.";
        passwordField.classList.add('error');
        isValid = false;
    } else {
        passwordField.classList.remove('error');
    }

    return isValid;
}
