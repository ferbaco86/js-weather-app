const convertion = (() => {
  const celsiusToFarenheit = (celsius) => {
    const newTemp = (celsius - 32) * (5 / 9);
    return newTemp;
  };

  const farenheitToCelsius = (farenheit) => {
    const newTemp = (farenheit * (9 / 5)) + 32;
    return newTemp;
  };
  return {
    celsiusToFarenheit,
    farenheitToCelsius,
  };
})();

export default convertion;