export const DateConvert = (stratingfrom) => {
    const dateString = stratingfrom;
    const [month, day, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}