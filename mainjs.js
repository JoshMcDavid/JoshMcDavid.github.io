const ipAddressField = document.querySelector('.ip_result');
const timezoneInput = document.querySelector('.user-timezone');
const countryLocationInput = document.querySelector('.user-location');
const ispInput = document.querySelector('.user-service-value');
const submitBtn = document.querySelector('.btn');
const inputField = document.querySelector('.input_ip');

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let ipAddress;
let randomIP = '';
let timeZone;
let countryLocation;
let cityLocation;
let postalCode;
let isp;
let lat;
let lng;
const apiKey = '3440c4ff21044ccb90ce3bd800f8a847';
let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=`;
fetch(url)
  .then((response) => response.json())
  .then((response) => {
    ipAddress = response.ip;
    timeZone = response.time_zone.offset;
    countryLocation = response.country_name;
    cityLocation = response.city;
    postalCode = response.zipcode;
    isp = response.isp;
    lat = response.latitude;
    lng = response.longitude;

    ipAddressField.innerHTML = ipAddress;
    timezoneInput.innerHTML = ` UTC ${timeZone}`;
    countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`;
    ispInput.innerHTML = isp;
    mapLocation(lat, lng);
  });

function mapLocation(lat, lng) {
  var markerIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 55],
  });
  map.setView([lat, lng], 17);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (
    inputField.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    )
  ) {
    randomIP = inputField.value;
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=` + randomIP;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        ipAddress = response.ip;
        timeZone = response.time_zone.offset;
        countryLocation = response.country_name;
        cityLocation = response.city;
        postalCode = response.zipcode;
        isp = response.isp;
        lat = response.latitude;
        lng = response.longitude;

        ipAddressField.innerHTML = ipAddress;
        timezoneInput.innerHTML = ` UTC ${timeZone}`;
        countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`;
        ispInput.innerHTML = isp;
        mapLocation(lat, lng);
      });
  } else if (inputField.value !== '') {
    const domain = inputField.value.trim();
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&domain=${domain}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        ipAddress = response.ip;
        timeZone = response.time_zone.offset;
        countryLocation = response.country_name;
        cityLocation = response.city;
        postalCode = response.zipcode;
        isp = response.isp;
        lat = response.latitude;
        lng = response.longitude;

        ipAddressField.innerHTML = ipAddress;
        timezoneInput.innerHTML = ` UTC ${timeZone}`;
        countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`;
        ispInput.innerHTML = isp;
        mapLocation(lat, lng);
      });
  } else {
    alert('Please enter an IP address or domain!');
    return false;
  }
});
