import { Dimensions } from "react-native";

export function getDeviceHeight() {
    return Dimensions.get("window").height;
  }
export  function getDeviceWidth(){
    return Dimensions.get("window").width;
}


export function formatNumber(num){
  if (typeof num !== 'number') {
    // Handle the case where num is not a number
    return 'Invalid input';
  }
  const strNum = num.toString();
  if (num >= 0 && num <= 999) {
    return strNum;
  }
  if (num >= 1000 && num <= 999999) {
    const thousands = Math.floor(num / 1000);
    const remaining = num % 1000;
    if (remaining === 0) {
      return `${thousands}K`;
    } else {
      return `${thousands}.${Math.floor(remaining / 100)}K`;
    }
  }
  return strNum;
}