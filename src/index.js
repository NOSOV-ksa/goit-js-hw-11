import photoCard from './partials/templait-gallery.hbs'
import './sass/main.scss';
import ApiService from './partials/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";

const refs = {
    searchForm: document.querySelector("#search-form"),
    btnLoadMore: document.querySelector('.load-more'),
    cardGallery: document.querySelector('.card-gallery'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

// console.log(document.querySelector( '[name="searchQuery"]'))

const apiService = new ApiService();

function onSearchForm(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.searchQuery.value;

    apiService.fetchService()
    .then(hits => {
        clearSearchForm()
        onRenderGalleryList(hits)
    })
    apiService.resetPage()
};

function onLoadMore() {
    apiService.fetchService()
    .then(onRenderGalleryList)
}

function onRenderGalleryList (hits) {
    refs.cardGallery.insertAdjacentHTML('beforeend', photoCard(hits))
}

function clearSearchForm() {
    refs.cardGallery.innerHTML = '';
}