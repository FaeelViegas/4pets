document.addEventListener("DOMContentLoaded", function () {
    let arrow = document.querySelectorAll(".arrow"); //Retorna uma NodeList de todos os elementos descendentes do elemento
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement; //seleciona o pai principal da seta
            arrowParent.classList.toggle("showMenu");
        });
    }
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".fa-bars");
    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });
})