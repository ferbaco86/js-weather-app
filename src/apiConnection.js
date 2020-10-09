
const apiManager = (() => {
  const handle404 = (data) => {
    let message;
    if (data.cod === '404') {
      message = "I'm sorry but the city it's not in our records";
    }
    return message;
  };
  const getCityData = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`, { mode: 'cors' });
    const getData = await response.json();
    handle404(getData);
    return getData;
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

  return {
    getWeatherData,
    getWeatherMain,
  };
})();

export default apiManager;