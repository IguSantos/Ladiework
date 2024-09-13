document.addEventListener("DOMContentLoaded", function() {
    const useCodeButton = document.getElementById("use-code");
    const useIdButton = document.getElementById("use-id");
    const pixKeyArticle = document.getElementById("pix-key");
    const qrCodeArticle = document.getElementById("qr-code");
  
    // Função para verificar o tamanho da janela e reverter as alterações
    function resetDisplay() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 700) {
        pixKeyArticle.style.display = "block";
        qrCodeArticle.style.display = "flex";
      } else {
        pixKeyArticle.style.display = "block";
        qrCodeArticle.style.display = "none";
      }
    }
  
    // Verificar e redefinir quando a página é carregada
    resetDisplay();
  
    // Verificar e redefinir quando a janela é redimensionada
    window.addEventListener("resize", resetDisplay);
  
    useCodeButton.addEventListener("click", function() {
      pixKeyArticle.style.display = "none";
      qrCodeArticle.style.display = "flex";
    });
  
    useIdButton.addEventListener("click", function() {
      pixKeyArticle.style.display = "block";
      qrCodeArticle.style.display = "none";
    });
  });
  

// Colar chave pix
document.addEventListener("DOMContentLoaded", function() {
    const controlvButton = document.getElementById("controlv");
    const uniqueIdentificatorInput = document.getElementById("unique-identificator");
  
    controlvButton.addEventListener("click", function() {
      // Tenta copiar o conteúdo da área de transferência do sistema
      navigator.clipboard.readText()
        .then(text => {
          // Define o valor do input com o texto copiado
          uniqueIdentificatorInput.value = text;
        })
        .catch(err => {
          console.error('Falha ao ler o texto da área de transferência: ', err);
        });
    });
  });
  
