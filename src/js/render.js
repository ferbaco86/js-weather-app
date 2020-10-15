
import domManipulation from './DOMhelpers';
import data from './data.json';
import convertion from './tempConvertion';

const render = (() => {
  const tempScale = domManipulation.getHtmlElement({ byId: 'switch' }).checked;

  const renderError = (message, messageTransition) => {
    const text = domManipulation.getHtmlElement({ byId: 'message-text' });
    domManipulation.setInnerHtml(text, message);
    messageTransition.show();
  };

  const removeError = () => {
    const container = domManipulation.getHtmlElement({ byQueryClass: '.message' });
    domManipulation.removeClasses(container, ['is-message-active']);
  };

  const renderCelsius = (weatherInfo) => {
    const tempCelsius = Object.keys(weatherInfo.current).filter(key => key !== 'icon')
      .map(key => weatherInfo.current[key]);
    return tempCelsius;
  };

  const renderWeeklyCelsius = (weatherInfo) => {
    const weeklyTempCelsius = [];
    const weeklyInfoCelsius = Object.keys(weatherInfo).filter(key => key !== 'current')
      .map(key => weatherInfo[key]);
    weeklyInfoCelsius.forEach(temp => weeklyTempCelsius.push(Object.keys(temp)
      .filter(key => key !== 'icon' && key !== 'dt')
      .map(key => temp[key])));
    return weeklyTempCelsius;
  };

  const renderFarenheit = (weatherInfo) => {
    const tempFarenheit = Object.keys(weatherInfo.current).filter(key => key !== 'icon')
      .map(key => convertion.celsiusToFarenheit(weatherInfo.current[key]));
    return tempFarenheit;
  };

  const renderWeeklyFarenheit = (weatherInfo) => {
    const weeklyTempFarenheit = [];
    const weeklyInfoFarenheit = Object.keys(weatherInfo).filter(key => key !== 'current')
      .map(key => weatherInfo[key]);
    weeklyInfoFarenheit.forEach(temp => weeklyTempFarenheit.push(Object.keys(temp)
      .filter(key => key !== 'icon' && key !== 'dt')
      .map(key => convertion.celsiusToFarenheit(temp[key]))));
    return weeklyTempFarenheit;
  };

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

  const roundTemps = (temps) => temps.map(temp => Math.round(temp));

  const renderWeatherIcon = (data, icon) => {
    if (!domManipulation.getHtmlElement({ byQueryClass: 'img' })) {
      const parentElement = domManipulation.getHtmlElement({ byId: 'wicon-container' });
      domManipulation.createImage(data[icon], 'weather icon', parentElement, ['wicon']);
    } else {
      const previousIcon = domManipulation.getHtmlElement({ byQueryClass: 'img' });
      domManipulation.setHtmlAttributes(previousIcon, 'src', data[icon]);
    }
  };

  const setTemps = (tempElement, feelElement, minElement, maxElement, temps) => {
    const roundedTemps = roundTemps(temps);
    domManipulation.setInnerHtml(tempElement, roundedTemps[0]);
    domManipulation.setInnerHtml(feelElement, roundedTemps[1]);
    domManipulation.setInnerHtml(minElement, roundedTemps[2]);
    domManipulation.setInnerHtml(maxElement, roundedTemps[3]);
  };

  const setMinWeeklyTemps = (minElement, temps, index) => {
    const roundedTemps = roundTemps(temps[index]);
    domManipulation.setInnerHtml(minElement, roundedTemps[0]);
  };

  const setMaxWeeklyTemps = (maxElement, temps, index) => {
    const roundedTemps = roundTemps(temps[index]);
    domManipulation.setInnerHtml(maxElement, roundedTemps[1]);
  };

  const renderCurrentWeather = (weatherInfo, tempScale, currentCity = null) => {
    const scalesText = domManipulation.getHtmlElement({ byQueryAllClass: '.scale' });
    const cityTitle = domManipulation.getHtmlElement({ byId: 'current-city' });
    const currentTemp = domManipulation.getHtmlElement({ byId: 'current-temp' });
    const currentFeel = domManipulation.getHtmlElement({ byId: 'current-feel' });
    const currentMin = domManipulation.getHtmlElement({ byId: 'current-min' });
    const currentMax = domManipulation.getHtmlElement({ byId: 'current-max' });
    const weeklyMin = domManipulation.getHtmlElement({ byQueryAllClass: '.week-min' });
    const weeklyMax = domManipulation.getHtmlElement({ byQueryAllClass: '.week-max' });
    const currentIcon = weatherInfo.current.icon;

    if (currentCity !== null) {
      domManipulation.setInnerHtml(cityTitle, currentCity);
    }


    if (!tempScale) {
      scalesText.forEach(scale => (domManipulation.setInnerHtml(scale, 'ºC')));
      const celsiusTemps = renderCelsius(weatherInfo);
      const weeklyCelsiusTemps = renderWeeklyCelsius(weatherInfo);
      weeklyMin.forEach((min, index) => { setMinWeeklyTemps(min, weeklyCelsiusTemps, index); });
      weeklyMax.forEach((max, index) => { setMaxWeeklyTemps(max, weeklyCelsiusTemps, index); });
      setTemps(currentTemp, currentFeel, currentMin, currentMax, celsiusTemps);
    } else {
      scalesText.forEach(scale => (domManipulation.setInnerHtml(scale, 'ºF')));
      const farenheitTemps = renderFarenheit(weatherInfo);
      const weeklyFarenheitTemps = renderWeeklyFarenheit(weatherInfo);
      weeklyMin.forEach((min, index) => { setMinWeeklyTemps(min, weeklyFarenheitTemps, index); });
      weeklyMax.forEach((max, index) => { setMaxWeeklyTemps(max, weeklyFarenheitTemps, index); });
      setTemps(currentTemp, currentFeel, currentMin, currentMax, farenheitTemps);
    }


    renderWeatherIcon(data, currentIcon);
  };
  return {
    renderMatches,
    renderCurrentWeather,
    renderCelsius,
    renderWeeklyCelsius,
    renderFarenheit,
    renderError,
    removeError,
    tempScale,
  };
})();

export default render;