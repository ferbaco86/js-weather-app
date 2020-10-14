import 'bulma/css/bulma.css';
import './style.css';
import { transitionHiddenElement } from '@cloudfour/transition-hidden-element';
import weatherManager from './weather';
import geoLocation from './geolocation';
import domManipulation from './DOMhelpers';
import stringManipulation from './stringHelpers';
import render from './render';

const inputCity = domManipulation.getHtmlElement({ byId: 'search' });
const matchList = domManipulation.getHtmlElement({ byId: 'matches' });
const getWeatherBtn = domManipulation.getHtmlElement({ byId: 'search-btn' });
const downArrow = domManipulation.getHtmlElement({ byId: 'down-arrow' });
const cardFooter = domManipulation.getHtmlElement({ byQueryClass: '.card-footer' });
const menuTransitioner = transitionHiddenElement({
  element: cardFooter,
  visibleClass: 'is-cf-active',
  hideMode: 'display',
  displayValue: 'flex',
  timeoutDuration: '100ms',
});

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
  const form = domManipulation.getHtmlElement({ byQueryClass: '.form' });
  const data = await weatherManager.getWeatherData(geoLocation.coordinates.lat,
    geoLocation.coordinates.lon);
  render.renderCurrentWeather(inputCity.value, data);
  form.reset();
});

downArrow.addEventListener('click', () => {
  domManipulation.toggleClass(downArrow, 'is-active');
  menuTransitioner.toggle();
});
