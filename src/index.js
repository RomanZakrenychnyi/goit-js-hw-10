var debounce = require('lodash.debounce');
// import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const countryName = document.querySelector('#search-box');
const countryListRespons = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const handleCountryInputValue = ({target}) => {
    const searchCountry = target.value.trim()
    fetchCountries(searchCountry)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const debouncedFetch = debounce(handleCountryInputValue, 300);

countryName.addEventListener('input', debouncedFetch);
