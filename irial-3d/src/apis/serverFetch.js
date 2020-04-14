
import fetch from 'isomorphic-unfetch';
const baseURL = "https://www.vinalestraveler.com/backend/ajax";

export default url => fetch(baseURL+url); 