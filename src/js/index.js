import 'bulma/css/bulma.css';
import '../css/style.css';
import 'bulma-switch';
import 'weathericons/css/weather-icons.css';
import { transitionHiddenElement } from '@cloudfour/transition-hidden-element';
import weatherManager from './weather';
import geoLocation from './geolocation';
import domManipulation from './DOMhelpers';
import stringManipulation from './stringHelpers';
import render from './render';
import validations from './validation';


const inputCity = domManipulation.getHtmlElement({ byId: 'search' });
const matchList = domManipulation.getHtmlElement({ byId: 'matches' });
const getWeatherBtn = domManipulation.getHtmlElement({ byId: 'search-btn' });
const downArrow = domManipulation.getHtmlElement({ byId: 'down-arrow' });
const cardFooter = domManipulation.getHtmlElement({ byQueryClass: '.card-footer' });
const tempSwitch = domManipulation.getHtmlElement({ byQueryClass: '.switch' });
const messageContainer = domManipulation.getHtmlElement({ byQueryClass: '.message' });
const menuTransitioner = transitionHiddenElement({
  element: cardFooter,
  visibleClass: 'is-cf-active',
  hideMode: 'display',
  displayValue: 'flex',
  timeoutDuration: '100ms',
});
const messageTransitioner = transitionHiddenElement({
  element: messageContainer,
  visibleClass: 'is-message-active',
  hideMode: 'display',
});

const getSetCoordinates = (element) => {
  const lat = domManipulation.getHtmlAttributes(element, 'data-lat');
  const lon = domManipulation.getHtmlAttributes(element, 'data-lon');
  geoLocation.setCoordinates(lat, lon);
};

inputCity.addEventListener('input', () => {
  validations.noInput(inputCity, messageTransitioner);
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

const retrieveData = async (lat, lon) => {
  const weatherData = await weatherManager.getWeatherData(lat,
    lon);
  return weatherData;
};

const showInitialCity = async () => {
  const data = await retrieveData('-33.4372', '-70.6506');
  render.renderCurrentWeather(data, render.tempScale, 'Santiago, Chile');
  geoLocation.setCoordinates('-33.4372', '-70.6506');
};

showInitialCity();

getWeatherBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = await retrieveData(geoLocation.coordinates.lat, geoLocation.coordinates.lon);
  const matches = domManipulation.getHtmlElement({ byQueryAllClass: '.match' });
  const inputCheck = validations.checkInput(matches, inputCity, messageTransitioner);
  if (inputCity.validity.valueMissing || inputCheck) {
    render.renderError('INCORRECT CITY ON INPUT', messageTransitioner);
    domManipulation.addClasses(inputCity, ['is-danger']);
  } else {
    inputCity.setCustomValidity('');
    domManipulation.removeClasses(inputCity, ['is-danger']);
    messageTransitioner.hide();
    const form = domManipulation.getHtmlElement({ byQueryClass: '.form' });
    render.renderCurrentWeather(data, render.tempScale, inputCity.value);
    form.reset();
  }
});

downArrow.addEventListener('click', () => {
  domManipulation.toggleClass(downArrow, 'is-active');
  menuTransitioner.toggle();
});

tempSwitch.addEventListener('click', async () => {
  render.tempScale = !render.tempScale;
  const data = await retrieveData(geoLocation.coordinates.lat, geoLocation.coordinates.lon);
  render.renderCurrentWeather(data, render.tempScale);
});