const dropDown = document.querySelector('.dropdownMenu');
const dropdownOption = document.querySelector('.dropdown_option');
const toggle = document.querySelector('.toggle');
const icon = document.querySelector('.bx');
const countries = document.querySelector('.countries');
const search = document.querySelector('.search');
const regions = document.querySelectorAll('.regions');

toggle.addEventListener('click', (e) => {
  document.body.classList.toggle('dark_mode');
  toggle.classList.toggle('dark_mode');
  icon.classList.toggle('bx-moon');
  dropDown.classList.toggle('dark_mode');
});

dropDown.addEventListener('click', (e) => {
  dropdownOption.classList.toggle('show_options');
});

async function getCountries() {
  const URL = await fetch('data.json');
  const response = await URL.json();
  response.forEach((api) => {
    showCountry(api);
  });
}

getCountries();

function showCountry(data) {
  const country = document.createElement('div');
  country.classList.add('country');
  country.innerHTML = `
    <div class="country_img">
        <img src="${data.flag}" alt="country image">
    </div>
    <div class="country_details">
        <h5 class="countryName">${data.name}</h5>
        <p class="regionName"><strong>Region:</strong> ${data.region}</p>
        <p><strong>Population:</strong> ${data.population}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
    </div>`;

  countries.appendChild(country);
}

const countryName = document.getElementsByClassName('countryName');
search.addEventListener('input', (e) => {
  Array.from(countryName).forEach((country) => {
    if (country.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      country.parentElement.parentElement.style.display = 'grid';
    } else {
      country.parentElement.parentElement.style.display = 'none';
    }
  });
});

const regionName = document.getElementsByClassName('regionName');
regions.forEach((region) => {
  region.addEventListener('click', (e) => {
    const selectedRegion = region.innerText.toLowerCase();
    Array.from(regionName).forEach((element) => {
      const countryRegion = element.innerText
        .toLowerCase()
        .replace('region:', '')
        .trim();
      if (selectedRegion === 'all' || selectedRegion === countryRegion) {
        element.parentElement.parentElement.style.display = 'grid';
      } else {
        element.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});
