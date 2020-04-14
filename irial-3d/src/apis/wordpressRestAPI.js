import axios from 'axios';

export default axios.create({
  baseURL: 'https://solutiontriangle.com/wp-json/wp/v2'
});
