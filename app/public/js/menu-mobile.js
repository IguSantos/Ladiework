function openMenu() {
    const navList = document.getElementById('mobile-nav')
    navList.classList.add('show-menu')

    document.body.classList.add('no-scroll')


}

function closeMenu() {
    document.getElementById('mobile-nav').classList.remove('show-menu')
    document.body.classList.remove('no-scroll')
};
