
//VARIABLES
const darkModeClass = 'dark-mode';
const button = document.querySelector('#mode-selector');
const body = document.querySelector('body');
const logo = document.querySelector('#logo');
const titleTransaction = document.querySelector('.transaction h2');
const titleTransactions = document.querySelector('.transactions h2');
const thead = document.querySelector('thead');
const iconOne = document.querySelector('.fab');
const iconTwo = document.querySelector('.lin');

const changeMode = () => {
    changeClass();
    changeText();  
}

const changeClass = () =>{
    button.classList.toggle(darkModeClass);
    body.classList.toggle(darkModeClass);
    logo.classList.toggle(darkModeClass);
    titleTransaction.classList.toggle(darkModeClass);
    titleTransactions.classList.toggle(darkModeClass);
    thead.classList.toggle(darkModeClass);
    iconOne.classList.toggle(darkModeClass);
    iconTwo.classList.toggle(darkModeClass);
}

const changeText = () => {
    const lightMode = `<i class="fas fa-sun"></i> Light Mode`;
    const darkMode = 'Dark Mode';
    if(body.classList.contains(darkModeClass)){
        button.innerHTML = lightMode;
        return;
    }
    button.innerHTML = `<i class="fas fa-moon"> ${darkMode}`;
}

button.addEventListener('click', changeMode);