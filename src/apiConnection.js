import render from './render';

const apiManager = (() => {
  const owApiKey = process.env.WEATHER_API_KEY;
  const iqApiKey = process.env.IQ_ACCESS_KEY;

  const handleWeather404 = (data) => {
    let message;
    if (data.cod === '404') {
      message = "I'm sorry but the city it's not in our records";
    }
    return message;
  };
  const getCityData = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${owApiKey}`, { mode: 'cors' });
    const getData = await response.json();
    handleWeather404(getData);
    return getData;
  };

  const getCityLocation = async (cityName, matchList) => {
    try {
      const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${iqApiKey}&q=${cityName}&limit=5&tag=place%3Acity&accept-language=en`, { mode: 'cors' });
      const getData = await response.json();

      render.renderMatches(getData, matchList);
      return getData;
    } catch (error) {
      return error;
    }
  };

  const getWeatherData = async (cityName) => {
    const cityData = await getCityData(cityName);
    const weatherData = await cityData.weather;
    return weatherData;
  };

  const getWeatherMain = async (cityName) => {
    const cityData = await getCityData(cityName);
    const weatherMain = await cityData.main;
    return weatherMain;
  };

  const storeWheaterInfo = (cityName) => {
    const info = {
      // name: `${getCityData(cityName).name}, ${getCityData(cityName).sys.country}`,
      temp: getWeatherMain(cityName).temp,
      feels: getWeatherMain(cityName).feels_like,
      min: getWeatherMain(cityName).temp_min,
      max: getWeatherMain(cityName).temp_max,
    };
    return info;
  };

  return {
    getWeatherData,
    getWeatherMain,
    storeWheaterInfo,
    getCityLocation,
  };
})();

export default apiManager;