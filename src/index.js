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

// console.log(document.querySelector( '[name="searchQuery"]'))

const apiService = new ApiService();

function onSearchForm(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.searchQuery.value.trim();
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

    if (articles.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    };

    if (refs.totalQuantyti > articles.totalHits) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.btnLoadMore.classList.add('is-hidden')
    };
}

function clearSearchForm() {
    refs.cardGallery.innerHTML = '';
}

//SimpleLightbox

// let gallery = new simpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function () {
//     captionsData: 'alt';
//     captionDelay: 250;
// })

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