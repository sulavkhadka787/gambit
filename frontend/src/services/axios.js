import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DATABASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    if (document.cookie) {
      var re = new RegExp("AUTH-TOKEN=([^;]+)");
      var value = re.exec(document.cookie);
      const token = value != null ? unescape(value[1]) : null;

      if (token) {
        config.headers.auth_token = token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
