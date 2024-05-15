import axios, { Axios } from "axios";

axios.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*'; // Sesuaikan dengan domain Anda jika perlu
  return config;
});

// import router from "../router/router";


// const hrisServiceHr1Mod1 = axios.create({
//   baseURL: "http://bdg2.jasamedika.com:2304/dataHr1Mod1", // "http://localhost:9090/dataHr1Mod1", */
// });

// const hrisServiceHr2Mod3 = axios.create({
//   baseURL: "http://bdg2.jasamedika.com:2304/dataHr2Mod3", // "http://localhost:9090/dataHr2Mod3"*/
// });

// const hrisServiceAuthInfo = axios.create({
//   baseURL: "http://bdg2.jasamedika.com:2304/authInfo", // "http://localhost:9090/dataHr2Mod3"*/
// });

// const dataMaster = axios.create({
//   baseURL: "http://bdg2.jasamedika.com:2304/dataMaster", // "http://localhost:9090/dataMaster"*/
// });


const hrisServiceHr1Mod1 = axios.create({
  // baseURL: "http://10.10.0.24:9292",
  baseURL: "http://localhost:9090/dataHr1Mod1",
});

const hrisServiceHr2Mod3 = axios.create({
  baseURL: "http://localhost:9090/dataHr2Mod3",
});

const hrisServiceAuthInfo = axios.create({
  baseURL: "http://localhost:9090/authInfo",
});

const dataMaster = axios.create({
  baseURL: "http://localhost:9090/dataMaster",
});


const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ2ZXJcIjoxLFwiaXNQYXNpZW5cIjpmYWxzZSxcIm1vZFwiOlwiRTJcIixcImVzc1wiOmZhbHNlLFwicnVhbmdcIjpcIjAwMlwiLFwic3VpZFwiOjAsXCJkZXB0XCI6XCIwMVwiLFwicHJvZlwiOjMsXCJjb3VudHJ5UGd3XCI6MSxcInVpZFwiOjM1LFwiaGlzdFwiOlwiOTg3ODY2ODc2NTdcIixcInBlZ1wiOlwiUDAyNjVcIixcImNvdW50cnlQcm9maWxlXCI6MSxcImxva2FzaVwiOlwiMDAxXCIsXCJrbG1wXCI6MSxcImVuY1wiOlwiMzVBSVVFTzAzNVwiLFwiaXNVc2VyXCI6dHJ1ZSxcInVzZXJcIjpcImNhcm9sLnN1c2FuLmphbmUuZGFudmVyc0BqYXNhbWVkaWEuY29tXCIsXCJqYWJhdFwiOlwiMjdcIixcImluZm9cIjpcIlwifSJ9.pHrNAwl9ePZKt_tX4X4SaPsMR8ta7QK-Vlcs1mtYkPf7glqA0JoDfzwCBQczfGM8kyxLKQPbmO0J5z6EaaEPUA";

//   Api.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent, like adding headers
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// Api.interceptors.response.use(
//   (response) => {
//     // Do something with response data
//     return response;
//   },
//   (error) => {
//     // Do something with response error
//     if (error.response && error.response.status === 403) {
//       // Token telah kadaluwarsa, lakukan redirect ke halaman login
//       // Misalnya, Anda ingin menggunakan router Vue, pastikan untuk mengimpor router sebelumnya
//       router.push("/login");
//     }
//     return Promise.reject(error);
//   }
// );
export {
  // Api,
  hrisServiceHr1Mod1,
  hrisServiceHr2Mod3,
  hrisServiceAuthInfo,
  dataMaster,
  token,
};