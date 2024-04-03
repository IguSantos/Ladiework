
 function popUP() {
    const openModalBtn = document.getElementById("openPopUp");
    const modal = document.querySelector(".fundo-preto");
    const closeBtn = document.querySelector(".close");

    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
        document.body.classList.add('no-scroll');
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll');
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });


}

popUP()



