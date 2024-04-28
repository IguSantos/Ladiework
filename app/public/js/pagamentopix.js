const button = document.querySelector(".botao");
const rectangle1 = document.querySelector(".retangulo1");
const rectangle2 = document.querySelector(".retangulo2");

button.addEventListener("click", function () {
    rectangle1.classList.add("hidden");
    rectangle2.classList.remove("hidden");
});

rectangle2.addEventListener("click", function () {
    rectangle1.classList.remove("hidden");
    rectangle2.classList.add("hidden");
});

button.addEventListener("click", function () {
    rectangle1.style.display = "none";
    rectangle2.style.display = "block";
});


