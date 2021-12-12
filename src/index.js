import './sass/main.scss';
import photoCard from './partials/templait-gallary.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchAPI from './partials/fetch.js';
// import creatList from './partials/templait-gallary.js'
// import SimpleLightbox from "simplelightbox";

const refs = {
    searchQuery: document.querySelector('[name="searchQuery"]'),
    btnSubmit: document.querySelector('[type="submit"]'),
    cardItems: document.querySelector('.card-item'),
    search: "",
}

// console.log(refs.search)

refs.searchQuery.addEventListener('input', (e) => {
    refs.search = e.currentTarget.value;
});

refs.btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetchAPI(refs.search)
        .then(request => request.json())
        .then(cards => renderCard(cards));
});

function renderCard(cards) {
    console.log(cards)
    const markup = photoCard(cards.hits)
    refs.cardItems.innerHTML = markup
}
