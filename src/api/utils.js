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