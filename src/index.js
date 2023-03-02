var debounce = require('lodash.debounce');
// var hbs = require('hbs');
// import { countryCard } from '../src/country-cards.hbs';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const countryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


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
                return;
            } else if (data.length === 1) {
                countryInfo.innerHTML = handleCreatMarkup(data);
                return;
            } else {
                countryInfo.innerHTML = handleCreatListRespons(data);
                return;
            }
        })
        .catch(() => {
            Notiflix.Notify.failure(`Oops, there is no country with that name: '${searchCountry}'`);
        });
};

const handleCreatMarkup = dates => {
    const countryInfoMarkup = dates.map(({ name, flags, capital, population, languages }) => {
        return `
<ul style="list-style:none">
    <li class="country-info__capital-flag" style="display:flex; gap:30px; ">
        <img class="country-list__flag"  src="${flags.svg}" alt="Flag of ${name.official}" width = 120px >
        <h2 class="country-info__name">${name.official}</h2>
    </li>
    <li class="country-info__capital" style="margin-top:20px">capital: ${capital}</li>
    <li class="country-info__population">population: ${population}</li>
    <li class="country-info__lang">languages: ${Object.values(languages).join(', ')}</li>
</ul>`
    }).join('')
    return countryInfoMarkup;
};

const handleCreatListRespons = params => {
    const countryListRespons = params.map(({ name, flags }) => {
        return `<ul style="list-style:none">
    <li class="country-info__capital-flag" style="display:flex; gap:5px; ">
        <img class="country-list__flag"  src="${flags.svg}" alt="Flag of ${name.official}" width = 80px>
        <h3 class="country-info__name">${name.official}</h3>
    </li>
</ul>`
    }).join('')
    return countryListRespons;
}


const debouncedFetch = debounce(handleCountryInputValue, 300);

countryName.addEventListener('input', debouncedFetch);

