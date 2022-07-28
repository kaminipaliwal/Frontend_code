import axios from "axios";

const http = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  timeout: 7000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: async function (url, data) {
      return new Promise((resolve, reject) => {
        http
          .get(url, { params: data })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getSync: function (url, data) {
      return new Promise((resolve, reject) => {
        http
          .get(url, { params: data })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    post: async function (url, data) {
      return new Promise((resolve, reject) => {
        http.post(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    patch: async function (url, data) {
      return new Promise((resolve, reject) => {
        http
          .patch(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete: async function (url, data) {
      return new Promise((resolve, reject) => {
        http
          .delete(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    options: async function (url, data) {
      return new Promise((resolve, reject) => {
        http
          .options(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetch: (options) => http(options),
  };