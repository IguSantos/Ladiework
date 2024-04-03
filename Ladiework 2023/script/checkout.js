document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var emailInput = document.getElementById("email").value;



    if (!emailInput.endsWith("gmail.com") && !emailInput.endsWith("hotmail.com")) {
   alert('utilize "gmail.com" ou "hotmail.com"')

    } else {
     
        window.location.href = "perfil.html";
     
    }

});

/* if (email.value.trim() === "" || !isValidEmail(email.value)) {
    email.setCustomValidity("Por favor, insira um email válido.");
} else {
    email.setCustomValidity(""); // Limpa a mensagem de validação personalizada
} */