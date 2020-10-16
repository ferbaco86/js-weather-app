import render from './render';

const weatherManager = (() => {
  const owApiKey = process.env.WEATHER_API_KEY;

  const storeWheaterInfo = (data) => {
    const info = {
      current: {
        temp: data.current.temp,
        feels: data.current.feels_like,
        min: data.daily[0].temp.min,
        max: data.daily[0].temp.max,
        icon: data.current.weather[0].icon,
      },
      day1: {
        dt: data.daily[1].dt,
        min: data.daily[1].temp.min,
        max: data.daily[1].temp.max,
        icon: data.daily[1].weather[0].id,
      },
      day2: {
        dt: data.daily[2].dt,
        min: data.daily[2].temp.min,
        max: data.daily[2].temp.max,
        icon: data.daily[2].weather[0].id,
      },
      day3: {
        dt: data.daily[3].dt,
        min: data.daily[3].temp.min,
        max: data.daily[3].temp.max,
        icon: data.daily[3].weather[0].id,
      },
      day4: {
        dt: data.daily[4].dt,
        min: data.daily[4].temp.min,
        max: data.daily[4].temp.max,
        icon: data.daily[4].weather[0].id,
      },
      day5: {
        dt: data.daily[5].dt,
        min: data.daily[5].temp.min,
        max: data.daily[5].temp.max,
        icon: data.daily[5].weather[0].id,
      },
    };
    return info;
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${owApiKey}`, { mode: 'cors' });
      const getData = await response.json();
      return storeWheaterInfo(getData);
    } catch (error) {
      render.renderError(error);
      return error;
    }
  };

  return {
    getWeatherData,
  };
})();

export default weatherManager;