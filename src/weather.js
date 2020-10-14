
const weatherManager = (() => {
  const owApiKey = process.env.WEATHER_API_KEY;

  const handleWeather404 = (data) => {
    let message;
    if (data.cod === '404') {
      message = "I'm sorry but the city it's not in our records";
    }
    return message;
  };

  const storeWheaterInfo = (data) => {
    const info = {
      current: {
        temp: Math.round(data.current.temp),
        feels: Math.round(data.current.feels_like),
        min: Math.round(data.daily[0].temp.min),
        max: Math.round(data.daily[0].temp.max),
        icon: data.current.weather[0].icon,
      },
      day1: {
        temp: Math.round(data.daily[1].temp.day),
        min: Math.round(data.daily[1].temp.min),
        max: Math.round(data.daily[1].temp.max),
      },
      day2: {
        temp: Math.round(data.daily[2].temp.day),
        min: Math.round(data.daily[2].temp.min),
        max: Math.round(data.daily[2].temp.max),
      },
      day3: {
        temp: Math.round(data.daily[3].temp.day),
        min: Math.round(data.daily[3].temp.min),
        max: Math.round(data.daily[3].temp.max),
      },
      day4: {
        temp: Math.round(data.daily[4].temp.day),
        min: Math.round(data.daily[4].temp.min),
        max: Math.round(data.daily[4].temp.max),
      },
      day5: {
        temp: Math.round(data.daily[5].temp.day),
        min: Math.round(data.daily[5].temp.min),
        max: Math.round(data.daily[5].temp.max),
      },
      day6: {
        temp: Math.round(data.daily[6].temp.day),
        min: Math.round(data.daily[6].temp.min),
        max: Math.round(data.daily[6].temp.max),
      },
      day7: {
        temp: Math.round(data.daily[7].temp.day),
        min: Math.round(data.daily[7].temp.min),
        max: Math.round(data.daily[7].temp.max),
      },
    };
    return info;
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${owApiKey}`, { mode: 'cors' });
      const getData = await response.json();
      handleWeather404(getData);
      return storeWheaterInfo(getData);
    } catch (error) {
      return error;
    }
  };

  return {
    getWeatherData,
  };
})();

export default weatherManager;