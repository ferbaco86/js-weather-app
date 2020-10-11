import domManipulation from './DOMhelpers';

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
  const renderCurrentWeather = (currentCity, weatherInfo) => {
    const cityTitle = domManipulation.getHtmlElement({ byId: 'current-city' });
    const currentTemp = domManipulation.getHtmlElement({ byId: 'current-temp' });
    const currentFeel = domManipulation.getHtmlElement({ byId: 'current-feel' });
    const currentMin = domManipulation.getHtmlElement({ byId: 'current-min' });
    const currentMax = domManipulation.getHtmlElement({ byId: 'current-max' });

    cityTitle.innerHTML = currentCity;
    currentTemp.innerHTML = weatherInfo.temp;
    currentFeel.innerHTML = weatherInfo.feels;
    currentMin.innerHTML = weatherInfo.min;
    currentMax.innerHTML = weatherInfo.max;
  };
  return {
    renderMatches,
    renderCurrentWeather,
  };
})();

export default render;