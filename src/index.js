import photoCardTpl from './partials/templait-gallery.hbs'
import './sass/main.scss';
import ApiService from './partials/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector("#search-form"),
    cardGallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    totalQuantyti: 0,
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

const apiService = new ApiService();

function onSearchForm(e) {
    e.preventDefault();

    // apiService.query = e.currentTarget.elements.searchQuery.value.trim();
    const valueSearch = e.currentTarget.elements.searchQuery.value.trim();
    if (e.currentTarget.elements.searchQuery.value === "") {
        error()
        return;
    } else {
        apiService.query = valueSearch;
    }
    apiService.resetPage();
    refs.totalQuantyti = 0;
    apiService.fetchService()
    .then(articles => {
        clearSearchForm()
        onRenderGalleryList(articles)
        console.log(articles)
    })
};

refs.btnLoadMore.classList.add('is-hidden')

function onLoadMore() {
    apiService.fetchService()
    .then(onRenderGalleryList)
}

function onRenderGalleryList(articles) {
    refs.cardGallery.insertAdjacentHTML('beforeend', photoCardTpl(articles.hits));
    refs.btnLoadMore.classList.remove('is-hidden');
    console.log('articles.total', articles.total);
    refs.totalQuantyti += apiService.perPage;
    lightbox.refresh();

    console.log(refs.totalQuantyti)


    if (articles.totalHits > 0) {
        Notify.success(`Hooray! We found ${articles.totalHits} images.`)
    };

    if (articles.totalHits === 0 || apiService.query === '') {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };

    if (refs.totalQuantyti > articles.totalHits) {
        error()
    };
}

function error() {
    Notify.info("We're sorry, but you've reached the end of search results.");
        refs.btnLoadMore.classList.add('is-hidden')
}

function clearSearchForm() {
    refs.cardGallery.innerHTML = '';
}

 const lightbox = new SimpleLightbox('.gallery a', {
   disableRightClick: true,
    scrollZoom: false,
    captionDelay: 250,
    captionsData: 'alt',
 });

 const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});