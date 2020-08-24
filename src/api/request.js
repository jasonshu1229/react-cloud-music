import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

// 请求 排行榜单数据
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};



// export const getSingerListRequest= (category, alpha, count) => {
//   return axiosInstance.get(`/artist/list?type=1&area=96&initial=b`);
// }