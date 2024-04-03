/* Colocar imagem */

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


/* Olhar senha */


const senhaInput = document.getElementById('senha');
const eyeIcon = document.querySelector('.eye-icon');

function togglePasswordVisibility() {
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.src = '../files/olhinho.svg'; // Altere o caminho para a imagem do olho aberto
    } else {
        senhaInput.type = 'password';
        eyeIcon.src = '../files/olhofechado.svg'; // Altere o caminho para a imagem do olho fechado
    }
}

const senha = document.getElementById('confirmar');
const eye = document.querySelector('.eye-icon2');

function togglePasswordVisibility2() {
    if (senha.type === 'password') {
        senha.type = 'text';
        eye.src = '../files/olhinho.svg'; // Altere o caminho para a imagem do olho aberto
    } else {
        senha.type = 'password';
        eye.src = '../files/olhofechado.svg'; // Altere o caminho para a imagem do olho fechado
    }
}

/* Email não aceitar */

document.getElementById("loginCadastro").addEventListener("submit", function (event) {
    event.preventDefault();

    var emailInput = document.getElementById("Email").value;

    if (!emailInput.endsWith("gmail.com") && !emailInput.endsWith("hotmail.com")) {
   alert('utilize "gmail.com" ou "hotmail.com"')

    } else {
     
        window.location.href = "perfil.html";
     
    }

});