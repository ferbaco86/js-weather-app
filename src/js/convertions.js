const convertion = (() => {
  const fahrenheitToCelsius = (fahrenheit) => {
    const newTemp = (fahrenheit - 32) * (5 / 9);
    return newTemp;
  };

  const celsiusToFahrenheit = (celsius) => {
    const newTemp = (celsius * (9 / 5)) + 32;
    return newTemp;
  };

  const unixTimestampToWeekDay = (unixTime) => {
    const milliseconds = unixTime * 1000;
    const newDate = new Date(milliseconds);
    return newDate.toLocaleString('en-US', { weekday: 'long' });
  };
  return {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    unixTimestampToWeekDay,
  };
})();

export default convertion;