import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchAPI from './partials/fetch.js';


const inputName = document.querySelector('[name="searchQuery"]');
const btnSearch = document.querySelector('[type="submit"]');

let textSearch = "";


inputName.addEventListener('input', onInputName);

// console.log(textSearch)

function onInputName(event) {
    const textSearch = event.target.value.trim();

    btnSearch.addEventListener('click', onSearchImg);
    function onSearchImg(event) {
        event.preventDefault();
        fetchAPI(textSearch);
    }

};

