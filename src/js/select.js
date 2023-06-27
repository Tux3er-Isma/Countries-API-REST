"use strict";

//Variables
const select = document.querySelector('.main__nav__select');
const defaultContainer = document.querySelector('.main__nav__select__default');
let icon = document.querySelector('.main__nav__select__default__icon');
const optionsContainer = document.querySelector('.main__nav__select__options-container');
let focused = false;

//Event Listeners
icon.addEventListener('click', (evt) =>{
    if (focused == false){
        focused = true;
        optionsContainer.style.animation = `salir .5s forwards`;
        evt.target.style.transform = `rotate(180deg)`;
    } else if (focused == true){
        focused = false;
        optionsContainer.style.animation = `volver .5s forwards`;
        evt.target.style.transform = `rotate(0deg)`;
    }
})