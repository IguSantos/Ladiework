// BOTAO PARA ROLAR PARA CIMA

const scrollToTopButton = document.getElementById("scrollToTopBtn");

 window.addEventListener("scroll", () => {
     if (window.pageYOffset > 250) {
         scrollToTopButton.classList.add("show");
     } else {
         scrollToTopButton.classList.remove("show");
     }
 });
 
 scrollToTopButton.addEventListener("click", () => {
     window.scrollTo({
         top: 0,
         behavior: "smooth"
     });
 });




 
 
 
 
 
 
 
 
 
 
 
 