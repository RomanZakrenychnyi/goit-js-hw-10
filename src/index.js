var debounce = require('lodash.debounce');
// import handleCreatMarkup from './template/country-markup.hbs';
// import handleCreatListRespons from './fetchCountries/country-list.hbs';
import { Markup } from './markup';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const countryName = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const markup = new Markup();


const handleCountryInputValue = ({ target }) => {
    const searchCountry = target.value.trim();
    if (searchCountry === '') {
        return countryInfo.innerHTML = '';
    }

    fetchCountries(searchCountry)
        .then(data => {
            if (data.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                // countryInfo.innerHTML = handleCreatListRespons(data);
            } else if (data.length === 1) {
                countryInfo.innerHTML = markup.handleCreatMarkup(data);
            } else {
                countryInfo.innerHTML = markup.handleCreatListRespons(data);
            }
        })
        .catch(() => {
            Notiflix.Notify.failure(`Oops, there is no country with that name: '${searchCountry}'`);
        });
};


const debouncedFetch = debounce(handleCountryInputValue, 300);

countryName.addEventListener('input', debouncedFetch);

