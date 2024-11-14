export const getIdFromUrl = (url) => {
  const regex = /(?:\?v=|\/embed\/|\.be\/|\/watch\?v=|\/live\/)([\w\d-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
