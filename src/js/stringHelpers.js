const stringManipulation = (() => {
  const lowerCase = (str) => str.toLowerCase();
  const removeWhiteSpace = (str) => str.replace(/\s+/g, '');

  const processString = (str) => {
    let newStr = lowerCase(str);
    newStr = removeWhiteSpace(newStr);
    return newStr;
  };
  return {
    processString,
  };
})();

export default stringManipulation;