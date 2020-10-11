import 'bulma/css/bulma.css';
import apiManager from './apiConnection';
import './style.css';

const inputCity = document.getElementById('search');
const matchList = document.getElementById('matches');

inputCity.addEventListener('input', () => apiManager.getCityLocation(inputCity.value, matchList));
