import domManipulation from './DOMhelpers';
import data from './data.json';
import convertion from './tempConvertion';

const render = (() => {
  const renderMatches = (matches, matchList) => {
    if (matches.length > 0) {
      const html = matches.map(match => `<div class="card mb-2 match" data-lat = "${match.lat}" data-lon = "${match.lon}">
      <h5 class ="p-2">${match.address.name}, ${match.address.country}</h5>
      </div>`).join('');
      matchList.innerHTML = html;
    } else {
      matchList.innerHTML = '';
    }
  };

  const renderWeatherIcon = (data, icon) => {
    if (!domManipulation.getHtmlElement({ byQueryClass: 'img' })) {
      const parentElement = domManipulation.getHtmlElement({ byId: 'wicon-container' });
      domManipulation.createImage(data[icon], 'weather icon', parentElement, ['wicon']);
    } else {
      const previousIcon = domManipulation.getHtmlElement({ byQueryClass: 'img' });
      domManipulation.setHtmlAttributes(previousIcon, 'src', data[icon]);
    }
  };

  const renderCurrentWeather = (currentCity, weatherInfo) => {
    const cityTitle = domManipulation.getHtmlElement({ byId: 'current-city' });
    const currentTemp = domManipulation.getHtmlElement({ byId: 'current-temp' });
    const currentFeel = domManipulation.getHtmlElement({ byId: 'current-feel' });
    const currentMin = domManipulation.getHtmlElement({ byId: 'current-min' });
    const currentMax = domManipulation.getHtmlElement({ byId: 'current-max' });
    const currentIcon = weatherInfo.current.icon;

    domManipulation.setInnerHtml(cityTitle, currentCity);
    domManipulation.setInnerHtml(currentTemp, weatherInfo.current.temp);
    domManipulation.setInnerHtml(currentFeel, weatherInfo.current.feels);
    domManipulation.setInnerHtml(currentMin, weatherInfo.current.min);
    domManipulation.setInnerHtml(currentMax, weatherInfo.current.max);


    renderWeatherIcon(data, currentIcon);
  };

  const renderCelsius = (weatherInfo) => {
    const tempCelsius = Object.keys(weatherInfo.current).filter(key => key !== 'icon')
      .map(key => weatherInfo.current[key]);
    return tempCelsius;
  };

  const renderFarenheit = (weatherInfo) => {
    const tempFarenheit = Object.keys(weatherInfo.current).filter(key => key !== 'icon')
      .map(key => convertion.farenheitToCelsius(weatherInfo.current[key]));
    return tempFarenheit;
  };
  return {
    renderMatches,
    renderCurrentWeather,
    renderCelsius,
    renderFarenheit,
  };
})();

export default render;