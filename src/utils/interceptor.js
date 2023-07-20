import axios from "axios";
import jwt_decode from "jwt-decode";
let isRefresh = false;
import { API_URL } from "@env";
import { getAsyncStorage } from "../utils/extra";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isTokenExpired = (t) => Date.now() >= jwt_decode(t || "null").exp * 1000;

const forceLogout = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};
let accessToken;

if (!accessToken) {
  (async () => {
    accessToken = await getAsyncStorage("accessToken");
  })();
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `JWT ${accessToken}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance?.interceptors?.request?.use(async (config) => {
  try {
    if (!config.url) return config;

    if (!accessToken)
      config.headers["Authorization"] = `JWT ${await getAsyncStorage(
        "accessToken"
      )}`;
    accessToken = await getAsyncStorage("accessToken");
    if (!isRefresh) {
      let accessToken = await getAsyncStorage("accessToken");

      if (!accessToken || isTokenExpired(accessToken)) {
        try {
          accessToken = data.message;
          AsyncStorage.setItem("accessToken", data.message);
        } catch (err) {
          forceLogout();
          return;
        }

        const { data } = await axios.post(
          process.env.API_URL + "/auth/refresh",
          {
            refresh: await getAsyncStorage("refreshToken"),
          }
        );
      }

      if (accessToken) config.headers["Authorization"] = `JWT ${accessToken}`;
    }

    if (isRefresh) isRefresh = false;

    return config;
  } catch (err) {
    console.log(err);
  }
});

axiosInstance?.interceptors?.response?.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;

    if (response?.status === 401 && !isRefresh) {
      let prevRefreshToken = await getAsyncStorage("refreshToken");
      if (!prevRefreshToken || isTokenExpired(prevRefreshToken)) forceLogout();

      const accessToken = await getAsyncStorage("accessToken");
      if (!accessToken || isTokenExpired(accessToken)) {
        try {
          const { data } = await axios.post(
            process.env.API_URL + "/auth/refresh",
            {
              refresh: await getAsyncStorage("refreshToken"),
            }
          );
          isRefresh = true;
          AsyncStorage.setItem("accessToken", data.message);
          config.headers["Authorization"] = `JWT ${data.message}`;
          return axios(config);
        } catch (error) {
          forceLogout();
        }
      }
      isRefresh = true;
    }

    isRefresh = false;
    if (response?.status === 401) forceLogout();

    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

export default axiosInstance;
