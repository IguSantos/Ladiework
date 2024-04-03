$(document).ready(function() {
    // Mostrar ou ocultar o botão de acordo com a posição da página
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $("#scrollButton").removeClass("hidden");
      } else {
        $("#scrollButton").addClass("hidden");
      }
    });
  
    // Rolagem suave para o topo quando o botão é clicado
    $("#scrollButton").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  });
  