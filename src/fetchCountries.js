const BASE_URL = 'https://restcountries.com/v3.1/name/';
const specifiedFields = '?fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}${specifiedFields}`).then(response);
}

