const axios = require('axios').default;

const keyAPI = "24739954-0d3e858e9f263100a20e7db59";
const URL_DOMAIN = "https://pixabay.com/api/";

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

function fetchImg(keyWord) {
    return fetch()
}