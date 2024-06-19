document.addEventListener('DOMContentLoaded', function() {
    const cardMentoring = document.getElementById('card-mentoring');
    const createMentoryForm = document.getElementById('create-mentory');
    const cardsSection = document.getElementById('cards');
    const h1Title = document.querySelector('h1');
    const progressBar = document.getElementById('current-progress');

    // Esconder formulários e card de mentoria no início
    createMentoryForm.classList.add('hidden');

    // Adicionar ouvinte de evento de clique no card de mentoria
    cardMentoring.addEventListener('click', function() {
        // Altera o título
        h1Title.textContent = 'Qual o título da sua mentoria?';

        // Esconde os cards
        cardsSection.style.display = 'none';

        // Mostra o formulário de mentoria
        createMentoryForm.classList.remove('hidden');

        // Mostra apenas o primeiro passo (form-step-1)
        document.getElementById('form-step-1').style.display = 'block';

        // Esconde os demais passos (form-step-2, form-step-3, form-step-4)
        hideFormSteps(['form-step-2', 'form-step-3', 'form-step-4']);

        // Atualiza a largura da barra de progresso
        updateProgressBar(20);
    });

    // Evento de clique no botão "Continuar" do form-step-1
    document.querySelector('#create-mentory .continue').addEventListener('click', function(event) {
      // Evita o envio do formulário

        // Validação do campo de título
        const inputTitulo = document.getElementById('input');
        if (inputTitulo.value.trim() === '') {
            inputTitulo.classList.add('error');
            document.querySelector('#form-step-1 .warning').textContent = 'O campo não pode estar vazio';
            inputTitulo.focus(); // Foca no campo de título para indicar o erro
            return; // Impede a continuação do fluxo se houver erro
        } else {
            inputTitulo.classList.remove('error'); // Remove a classe error se o campo estiver preenchido corretamente
        }

        // Esconde o form-step-1
        document.getElementById('form-step-1').style.display = 'none';

        // Mostra o form-step-2
        document.getElementById('form-step-2').style.display = 'block';

        // Altera o título para Step 2
        h1Title.textContent = 'Em qual categoria sua mentoria se encaixa?';

        // Esconde os demais passos (form-step-3, form-step-4)
        hideFormSteps(['form-step-3', 'form-step-4']);

        // Atualiza a largura da barra de progresso
        updateProgressBar(20);
    });

    // Evento de clique no botão "Continuar" do form-step-2
    document.querySelector('#create-mentory .continue-two').addEventListener('click', function(event) {
      // Evita o envio do formulário

        // Esconde o form-step-2
        document.getElementById('form-step-2').style.display = 'none';

        // Mostra o form-step-3
        document.getElementById('form-step-3').style.display = 'block';

        // Altera o título para Step 3
        h1Title.textContent = 'Qual sua formação na área?';

        // Esconde os demais passos (form-step-4)
        hideFormSteps(['form-step-4']);

        // Atualiza a largura da barra de progresso
        updateProgressBar(20);
    });

    // Evento de clique no botão "Continuar" do form-step-3
    document.querySelector('#create-mentory .continue-three').addEventListener('click', function(event) {
      // Evita o envio do formulário

        // Esconde o form-step-3
        document.getElementById('form-step-3').style.display = 'none';

        // Mostra o form-step-4
        document.getElementById('form-step-4').style.display = 'block';

        // Altera o título para Step 4
        h1Title.textContent = 'Adicione uma descrição a sua mentoria';

        // Atualiza a largura da barra de progresso
        updateProgressBar(20);
    });

    // Evento de clique no botão "Criar" do form-step-4
    document.querySelector('#create-mentory .continue-four').addEventListener('click', function(event) {
        // Validação do campo de descrição (textarea)
        const textareaDescricao = document.getElementById('description');
        if (textareaDescricao.value.trim() === '') {
          // Evita o envio do formulário
            textareaDescricao.classList.add('error');
            document.querySelector('#form-step-4 .warning').textContent = 'O campo não pode estar vazio';
            textareaDescricao.focus(); // Foca no campo de descrição para indicar o erro
        } else {
            textareaDescricao.classList.remove('error'); // Remove a classe error se o campo estiver preenchido corretamente
            document.querySelector('#form-step-4 .warning').textContent = ''; // Limpa qualquer mensagem de erro anterior
        }
    });

    // Função para esconder os demais passos do formulário de mentoria
    function hideFormSteps(stepsToHide) {
        stepsToHide.forEach(stepId => {
            const step = document.getElementById(stepId);
            if (step) {
                step.style.display = 'none';
            }
        });
    }

    // Função para atualizar a largura da barra de progresso
    function updateProgressBar(progress) {
        const currentWidth = parseInt(progressBar.style.width) || 0;
        progressBar.style.width = currentWidth + progress + '%';
    }
});



