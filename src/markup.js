export class Markup {

    handleCreatMarkup(dates) {
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
    }

    handleCreatListRespons(params) {
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
};
