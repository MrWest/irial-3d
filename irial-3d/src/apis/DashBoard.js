import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.107:8080/ibackend/ajax"
});