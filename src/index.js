import 'bulma/css/bulma.css';
import apiManager from './apiConnection';
import domManipulation from './helpers';
import './style.css';

const inputCity = domManipulation.getHtmlElement({ byId: 'search' });
const matchList = domManipulation.getHtmlElement({ byId: 'matches' });


inputCity.addEventListener('input', () => apiManager.getCityLocation(inputCity.value, matchList));
matchList.addEventListener('click', (e) => {
  const matchTarget = e.target;
  if (matchTarget.nodeName === 'H5') {
    inputCity.value = matchTarget.textContent;
    matchList.innerHTML = '';
  }
});
