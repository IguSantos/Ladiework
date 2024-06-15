function openMenu() {
    const navList = document.getElementById('mobile-nav')
    navList.classList.add('show-menu')
 
    document.body.classList.add('no-scroll')
}

function closeMenu() {
    document.getElementById('mobile-nav').classList.remove('show-menu')
    document.body.classList.remove('no-scroll')
};

// PROFILE
document.addEventListener("DOMContentLoaded", function() {
  var profileImage = document.getElementById("profileImage");
  var infoProfile = document.getElementById("infoProfile");

  profileImage.addEventListener("click", function() {
    if (infoProfile.classList.contains("hidden")) {
      infoProfile.classList.remove("hidden");
    } else {
      infoProfile.classList.add("hidden");
    }
  });

  // Adiciona um evento para fechar o perfil quando a largura da janela for menor que 800px
  window.addEventListener("resize", function() {
    if (window.innerWidth < 800 && !infoProfile.classList.contains("hidden")) {
      infoProfile.classList.add("hidden");
    }
  });

  // Verifica a largura da janela ao carregar a página
  if (window.innerWidth < 800 && !infoProfile.classList.contains("hidden")) {
    infoProfile.classList.add("hidden");
  }
});
