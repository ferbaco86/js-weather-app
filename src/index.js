import 'bulma/css/bulma.css';
import weatherManager from './weather';
import geoLocation from './geolocation';
import domManipulation from './DOMhelpers';
import stringManipulation from './stringHelpers';
import './style.css';
import render from './render';

const inputCity = domManipulation.getHtmlElement({ byId: 'search' });
const matchList = domManipulation.getHtmlElement({ byId: 'matches' });
const getWeatherBtn = domManipulation.getHtmlElement({ byId: 'search-btn' });

const getSetCoordinates = (element) => {
  const lat = domManipulation.getHtmlAttributes(element, 'data-lat');
  const lon = domManipulation.getHtmlAttributes(element, 'data-lon');
  geoLocation.setCoordinates(lat, lon);
};

inputCity.addEventListener('input', () => {
  geoLocation.getCityLocation(inputCity.value, matchList);
  matchList.childNodes.forEach(element => {
    const procInputCityStr = stringManipulation.processString(inputCity.value);
    const procMatchStr = stringManipulation.processString(element.innerText);
    if (procInputCityStr === procMatchStr) {
      getSetCoordinates(element);
    }
  });
});

matchList.addEventListener('click', (e) => {
  const matchTarget = e.target;
  if (matchTarget.nodeName === 'H5') {
    const card = matchTarget.parentNode;
    inputCity.value = matchTarget.innerText;
    getSetCoordinates(card);
    matchList.innerHTML = '';
  }
});

getWeatherBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = await weatherManager.getWeatherData(geoLocation.coordinates.lat,
    geoLocation.coordinates.lon);
  render.renderCurrentWeather(inputCity.value, data);
});