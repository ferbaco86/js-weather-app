
const weatherManager = (() => {
  const owApiKey = process.env.WEATHER_API_KEY;

  const handleWeather404 = (data) => {
    let message;
    if (data.cod === '404') {
      message = "I'm sorry but the city it's not in our records";
    }
    return message;
  };
  const getCityData = async (lat, lon) => {
    const weatherInfo = {};
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${owApiKey}`, { mode: 'cors' });
    const getData = await response.json();
    handleWeather404(getData);
    weatherInfo.temp = getData.current.temp;
    weatherInfo.feels_like = getData.current.feels_like;
    return weatherInfo;
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
    getCityData,
  };
})();

export default weatherManager;