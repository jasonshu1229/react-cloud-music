import { wait } from "@testing-library/react";

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