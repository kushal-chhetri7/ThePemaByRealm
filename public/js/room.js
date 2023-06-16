const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});
