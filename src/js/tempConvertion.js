const convertion = (() => {
  const farenheitToCelsius = (farenheit) => {
    const newTemp = (farenheit - 32) * (5 / 9);
    return newTemp;
  };

  const celsiusToFarenheit = (celsius) => {
    const newTemp = (celsius * (9 / 5)) + 32;
    return newTemp;
  };
  return {
    celsiusToFarenheit,
    farenheitToCelsius,
  };
})();

export default convertion;