// import axios from "axios";
// // const url = "http://localhost:8080/api/v1";
// const url = "https://mybloodbank.onrender.com";
// // const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
// const API = axios.create({ baseURL: url });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("token")) {
//         req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
//     }
//     return req;
// });

// export default API;
import axios from 'axios';
 const url=`${window.location.origin}/api/v1`;
const API = axios.create({ baseURL: url});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;
