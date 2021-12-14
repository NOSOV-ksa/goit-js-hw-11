import './sass/main.scss';
import ApiService from './partials/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import photoCard from './partials/templait-gallary.hbs'
// import creatList from './partials/templait-gallary.js'
// import SimpleLightbox from "simplelightbox";

const apiService = new ApiService();



const refs = {
    searchForm: document.querySelector("#search-form"),
    btnLoadMore: document.querySelector('.load-more'),
    cardItems: document.querySelector('.card-item'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearchForm(e) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    apiService.fetchService()
    apiService.resetPage()
};

function onLoadMore() {
    apiService.fetchService()
}


// e.preventDefault();
//     console.log(searchForm);

    // fetchAPI(refs.search)
    //     .then(request => request.json())
    //     .then(cards => renderCard(cards));


// function renderCard(cards) {
//     console.log(cards)
//     const markup = photoCard(cards.hits)
//     refs.cardItems.innerHTML = markup
// }

