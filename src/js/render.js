
import domManipulation from './DOMhelpers';
import data from './data.json';
import convertion from './convertions';

const render = (() => {
  const tempScale = domManipulation.getHtmlElement({ byId: 'switch' }).checked;

  const renderBackgroundColor = (iconCode) => {
    const currentWeatherCard = domManipulation.getHtmlElement({ byQueryClass: '.card' });
    currentWeatherCard.classList.forEach((bgClass) => {
      if (bgClass !== 'card' && bgClass !== 'column') {
        domManipulation.removeClasses(currentWeatherCard, [bgClass]);
      }
      domManipulation.addClasses(currentWeatherCard, [`b${iconCode}`]);
    });
    domManipulation.addClasses(currentWeatherCard, [`b${iconCode}`]);
  };

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

  const renderFahrenheit = (weatherInfo) => {
    const tempFahrenheit = Object.keys(weatherInfo.current).filter(key => key !== 'icon')
      .map(key => convertion.celsiusToFahrenheit(weatherInfo.current[key]));
    return tempFahrenheit;
  };

  const renderWeeklyFahrenheit = (weatherInfo) => {
    const weeklyTempFahrenheit = [];
    const weeklyInfoFahrenheit = Object.keys(weatherInfo).filter(key => key !== 'current')
      .map(key => weatherInfo[key]);
    weeklyInfoFahrenheit.forEach(temp => weeklyTempFahrenheit.push(Object.keys(temp)
      .filter(key => key !== 'icon' && key !== 'dt')
      .map(key => convertion.celsiusToFahrenheit(temp[key]))));
    return weeklyTempFahrenheit;
  };

  const renderMatches = (matches, matchList) => {
    if (matches.length > 0) {
      const html = matches.map(match => `<div class="card mb-2 match fade" data-lat = "${match.lat}" data-lon = "${match.lon}">
      <h5 class ="p-2">${match.address.name}, ${match.address.country}</h5>
      </div>`).join('');
      matchList.innerHTML = html;
      setTimeout(() => {
        const suggestions = domManipulation.getHtmlElement({ byQueryAllClass: '.match' });
        suggestions.forEach(item => domManipulation.removeClasses(item, ['fade']));
      }, 70);
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

  const renderWeeklyIcon = (weatherInfo) => {
    const weeklyIcons = [];
    const weeklyInfo = Object.keys(weatherInfo).filter(key => key !== 'current')
      .map(key => weatherInfo[key]);
    weeklyInfo.forEach(icon => weeklyIcons.push(Object.keys(icon)
      .filter(key => key === 'icon')
      .map(key => (icon[key]))));
    return weeklyIcons;
  };

  const renderDt = (weatherInfo) => {
    const weeklyDt = [];
    const weeklyInfo = Object.keys(weatherInfo).filter(key => key !== 'current')
      .map(key => weatherInfo[key]);
    weeklyInfo.forEach(dt => weeklyDt.push(Object.keys(dt)
      .filter(key => key === 'dt')
      .map(key => (dt[key]))));
    return weeklyDt;
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
    const weeklyIconsElement = domManipulation.getHtmlElement({ byQueryAllClass: '.week-icon' });
    const weeklyDaysTitle = domManipulation.getHtmlElement({ byQueryAllClass: '.week-title' });
    const weeklyIconsCodes = renderWeeklyIcon(weatherInfo);
    const weeklyDaysDt = renderDt(weatherInfo);

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
      const fahrenheitTemps = renderFahrenheit(weatherInfo);
      const weeklyFahrenheitTemps = renderWeeklyFahrenheit(weatherInfo);
      weeklyMin.forEach((min, index) => { setMinWeeklyTemps(min, weeklyFahrenheitTemps, index); });
      weeklyMax.forEach((max, index) => { setMaxWeeklyTemps(max, weeklyFahrenheitTemps, index); });
      setTemps(currentTemp, currentFeel, currentMin, currentMax, fahrenheitTemps);
    }

    weeklyIconsElement.forEach((icon, index) => {
      icon.classList.forEach((iconClass) => {
        if (iconClass !== 'wi' && iconClass !== 'title'
        && iconClass !== 'is-3' && iconClass !== 'mb-5'
        && iconClass !== 'week-icon') {
          domManipulation.removeClasses(icon, [iconClass]);
        }
      });

      domManipulation.addClasses(icon, [`wi-owm-${weeklyIconsCodes[index]}`]);
    });

    weeklyDaysTitle.forEach((title, index) => domManipulation.setInnerHtml(title,
      convertion.unixTimestampToWeekDay(weeklyDaysDt[index])));

    renderWeatherIcon(data, currentIcon);
    renderBackgroundColor(currentIcon);
  };
  return {
    renderMatches,
    renderCurrentWeather,
    renderCelsius,
    renderWeeklyCelsius,
    renderFahrenheit,
    renderError,
    removeError,
    tempScale,
  };
})();

export default render;