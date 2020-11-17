const gridContainer = document.querySelector('.grid-container');
const region = document.querySelector('.region');
const input = document.querySelector('form .country');

// show all countries when the page loads
window.addEventListener("DOMContentLoaded", () => {
    getCountries()
        .then(countries => generateHTML(countries));
});

// listen to the change region event
region.addEventListener('change', () => {
    getCountries()
        .then(countries => filterByRegion(countries));
});

// listen to change in search field
input.addEventListener('input', () => {
    const term = input.value.trim().toLowerCase();
    filterCountry(term);
});

// filter countries by region
const filterByRegion = countries => {
    if (region.value === 'all') {
        generateHTML(countries);
    } else {
        const filteredCountriesByRegion = countries.filter(country => country.region.toLowerCase() === region.value);
        generateHTML(filteredCountriesByRegion);
    }
}

// search for a country
const filterCountry = term => {
    // get countries showed on screen
    let countriesOnScreen = Array.from(document.querySelectorAll('.card'));

    // filter countries acording search term
    countriesOnScreen.forEach(country => {
        if (!country.querySelector('.card__name').innerText.toLowerCase().includes(term)) {
            country.classList.add('hide');
        } else {
            country.classList.remove('hide');
        }
    });
}

// generate html template & update UI
const generateHTML = countries => {
    let html = '';

    countries.forEach(country => {
        html += `
        <a href="details.html" class="card">
            <img class="card__flag" src="${country.flag}" alt="${country.demonym} flag">
            <div class="card__details">
                <div class="card__name">${country.name}</div>
                <div class="card__population">Population: <span>${country.population}</span></div>
                <div class="card__region">Region: <span>${country.region}</span></div>
                <div class="card__capital">Capital: <span>${country.capital}</span></div>
            </div>
        </a>
        `;    
    });

    gridContainer.innerHTML = html;
}