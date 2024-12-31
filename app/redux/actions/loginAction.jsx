export const setToken = (token) => {
  return { type: "SET_TOKEN", token };
};

export const setDownloadList = (list) => {
  console.log("redux action",list)
  return { type: "SET_DOWNLOADLIST", list };
};