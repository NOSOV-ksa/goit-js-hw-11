const axios = require('axios');

const keyAPI = "24739954-0d3e858e9f263100a20e7db59";
const baseURL = "pixabay.com";
const perPage = 40;

// axios({
  //   method: 'get',
  //   url: 'baseURL',
  //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   }
    // });

    // function fetchImg(keyWord) {

// }

//   .then(response => console.log(response))


export default function  onSearch(searchTypeObj) {

  return fetch(`https://${baseURL}/api/?key=${keyAPI}&q=${searchTypeObj}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=${perPage}`)


}
// onSearch("cat", 30)

