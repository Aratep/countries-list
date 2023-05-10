export function generateUUID() {
  var dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function numberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCountrliesList(countries: any) {
  let formattedCountriesList: any = [];

  countries.forEach((country: any) => {
    formattedCountriesList.push({
      ...country,
      uuid: generateUUID(),
      country: country.name.common,
      flag: country.flags.png,
      formattedPopulation: numberWithCommas(country.population),
      formattedArea: `${numberWithCommas(country.area)} square kilometer`,
    });
  });
  return formattedCountriesList;
}

export function sortAsc(arr: [], field: string) {
  let newArr = [...arr];
  return newArr.sort((a: any, b: any) => Number(a[field]) - Number(b[field]));
}

export function sortDesc(arr: any, field: string) {
  let newArr = [...arr];
  return newArr.sort((a: any, b: any) => Number(b[field]) - Number(a[field]));
}
