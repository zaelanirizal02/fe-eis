import axios, { Axios } from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:2000",
// });

const hrisServiceHr1Mod1 = axios.create({
  baseURL: "http://localhost:9090/dataHr1Mod1",
});

const hrisServiceHr2Mod3 = axios.create({
  baseURL: "http://localhost:9090/dataHr2Mod3",
});

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ2ZXJcIjoxLFwiaXNQYXNpZW5cIjpmYWxzZSxcIm1vZFwiOlwiRTJcIixcImVzc1wiOmZhbHNlLFwicnVhbmdcIjpcIjAwMlwiLFwic3VpZFwiOjAsXCJkZXB0XCI6XCIwMVwiLFwicHJvZlwiOjMsXCJjb3VudHJ5UGd3XCI6MSxcInVpZFwiOjM1LFwiaGlzdFwiOlwiOTg3ODY2ODc2NTdcIixcInBlZ1wiOlwiUDAyNjVcIixcImNvdW50cnlQcm9maWxlXCI6MSxcImxva2FzaVwiOlwiMDAxXCIsXCJrbG1wXCI6MSxcImVuY1wiOlwiMzVBSVVFTzAzNVwiLFwiaXNVc2VyXCI6dHJ1ZSxcInVzZXJcIjpcImNhcm9sLnN1c2FuLmphbmUuZGFudmVyc0BqYXNhbWVkaWEuY29tXCIsXCJqYWJhdFwiOlwiMjdcIixcImluZm9cIjpcIlwifSJ9.pHrNAwl9ePZKt_tX4X4SaPsMR8ta7QK-Vlcs1mtYkPf7glqA0JoDfzwCBQczfGM8kyxLKQPbmO0J5z6EaaEPUA";

export {
  // api,
  hrisServiceHr1Mod1,
  hrisServiceHr2Mod3,
  token,
};
