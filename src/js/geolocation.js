import render from './render';

const geoLocation = (() => {
  const coordinates = {};
  const iqApiKey = process.env.IQ_ACCESS_KEY;

  const setCoordinates = (lat, lon) => {
    coordinates.lat = lat;
    coordinates.lon = lon;
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
  return {
    coordinates,
    getCityLocation,
    setCoordinates,
  };
})();

export default geoLocation;