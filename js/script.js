const work01 = document.getElementById("work-01");
const work02 = document.getElementById("work-02");
const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]")

const changeLanguage = async language => {
    if (language === undefined) {
        return; // No hacer nada si language es undefined
    }
    
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json()

    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section
        const value = textToChange.dataset.value

        if (value === 'boton') {
            const buttonText = texts[section][value];
            textToChange.value = buttonText;
        }else{
            textToChange.innerHTML = texts[section][value];
        }
    }
}

flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language)
})

function addAll(){
    if (work02) {
        work02.style.display = 'grid'; // O cualquier otro valor para mostrar el elemento, como 'flex' o 'grid'
    } else {
        console.log("El elemento ya ha sido removido o no existe.");
    }
}

function removerBackend(){
    if (work02) {
        work02.style.display = 'none';
    }
}
/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 