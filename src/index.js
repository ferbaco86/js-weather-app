import apiManager from './apiConnection';

const getWeatherBtn = document.querySelector('button');

getWeatherBtn.addEventListener('click', () => {
  const cityNameInput = document.getElementById('cityName').value;
  apiManager.getWeatherData(cityNameInput);
  apiManager.getWeatherMain(cityNameInput);
});
