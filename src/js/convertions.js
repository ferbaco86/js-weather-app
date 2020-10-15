const convertion = (() => {
  const farenheitToCelsius = (farenheit) => {
    const newTemp = (farenheit - 32) * (5 / 9);
    return newTemp;
  };

  const celsiusToFarenheit = (celsius) => {
    const newTemp = (celsius * (9 / 5)) + 32;
    return newTemp;
  };

  const unixTimestampToWeekDay = (unixTime) => {
    const milliseconds = unixTime * 1000;
    const newDate = new Date(milliseconds);
    return newDate.toLocaleString('en-US', { weekday: 'long' });
  };
  return {
    celsiusToFarenheit,
    farenheitToCelsius,
    unixTimestampToWeekDay,
  };
})();

export default convertion;