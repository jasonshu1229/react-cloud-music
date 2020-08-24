import { RankTypes } from "./config";

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 1000) {
    return 1000;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

// 防抖函数
export const debounce = (func, wait) => {
  let timer = null;
  return function anonymous(...params) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...params);
      timer = null;
    }, wait)
  }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList [i].tracks.length && !rankList [i + 1].tracks.length) {
      return i + 1;
    }
  }
};

//找出排行榜的编号
export const filterIdx = name => {
  for (var key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};