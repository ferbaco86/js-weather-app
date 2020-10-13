import domManipulation from './DOMhelpers';
import data from './data.json';

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
    const currentIcon = weatherInfo.icon;

    domManipulation.setInnerHtml(cityTitle, currentCity);
    domManipulation.setInnerHtml(currentTemp, weatherInfo.temp);
    domManipulation.setInnerHtml(currentFeel, weatherInfo.feels);
    domManipulation.setInnerHtml(currentMin, weatherInfo.min);
    domManipulation.setInnerHtml(currentMax, weatherInfo.max);


    renderWeatherIcon(data, currentIcon);
  };
  return {
    renderMatches,
    renderCurrentWeather,
  };
})();

export default render;