

function openMenu() {
   const navList =  document.getElementById('nav-list')
   navList.classList.add('show-menu')

}

function closeMenu() {
    document.getElementById('nav-list').classList.remove('show-menu')
};


window.addEventListener("beforeunload", function() {
    document.getElementById("barra-de-carregamento").style.width = "100%";
});

document.addEventListener("DOMContentLoaded", function () {
    var carregarElement = document.querySelector(".carregar");
  
    
    carregarElement.style.display = "flex";
    document.body.classList.add('no-scroll');
  
    
    carregarElement.classList.add("fade-out");
  
   
    setTimeout(function () {
      carregarElement.style.display = "none";
      document.body.classList.remove('no-scroll');
    }, 2000);
  
   
    carregarElement.addEventListener("animationend", function () {
      carregarElement.classList.remove("fade-out");
    });
  });
  

  


