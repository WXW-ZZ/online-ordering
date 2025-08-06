import axios from "./request";
export const getApiHomeData = (param) => {
  return axios.request({
    url: "/home/getHomeData",
    method: "get",
    data: param,
  });
};
export const getApiStoreData = (param) => {
  return axios.request({
    url: "/home/getStoreData",
    method: "get",
    data: param,
  });
};
