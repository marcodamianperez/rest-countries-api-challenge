const gridContainer = document.querySelector('.grid-container');
const region = document.querySelector('.region');

// show all countries when the page loads
window.addEventListener("DOMContentLoaded", () => {

    getCountries()
        .then(countries => generateHTML(countries));
});

// listen to the change region event
region.addEventListener('change', () => {
    getCountries()
        .then(countries => filteredByRegion(countries));
});

// filter countries by region
const filteredByRegion = countries => {
    filteredCountries = countries.filter(country => country.region === region.selectedOptions[0].innerText);
    generateHTML(filteredCountries);
}

// update the UI
const generateHTML = countries => {
    let html = '';

    countries.forEach(country => {
        html += `
        <div class="card">
            <img class="card__flag" src="${country.flag}" alt="${country.demonym} flag">
            <div class="card__details">
                <div class="card__name">${country.name}</div>
                <div class="card__population">Population: <span>${country.population}</span></div>
                <div class="card__region">Region: <span>${country.region}</span></div>
                <div class="card__capital">Capital: <span>${country.capital}</span></div>
            </div>
        </div>
        `;    
    });

    gridContainer.innerHTML = html;
}