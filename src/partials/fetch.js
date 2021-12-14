// const axios = require('axios');
// const { re } = require('prettier');

export default class ApiService {
  constructor() {
    this.baseURL = "pixabay.com/api";
    this.keyAPI = "24739954-0d3e858e9f263100a20e7db59";
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
  async fetchService() {
    console.log(this)
    // const options = {
    //   "image_type": "photo",
    //   "orientation": "horizontal",
    //   "safesearch": "true",
    // }
    // const url = `https://${this.baseURL}/?key=${this.keyAPI}&q=${this.searchQuery}&page=1&per_page=${this.perPage}`;
    const url = `https://${this.baseURL}/?key=${this.keyAPI}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    await fetch(url)
      .then(response => response.json())
      .then(this.incrementPage())
}

  incrementPage() {
    this.page += 1;
  }


  get query() {
    return this.searchQuery;
  }
  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};
