import render from './render';
import stringManipulation from './stringHelpers';
import domManipulation from './DOMhelpers';

const validation = (() => {
  const noInput = (input, messageTransitioner) => {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Please add a city...');
      domManipulation.addClasses(input, ['is-danger']);
    } else {
      input.setCustomValidity('');
      render.removeError();
      messageTransitioner.hide();
      domManipulation.removeClasses(input, ['is-danger']);
    }
  };
  const checkInput = (matches, input, messageTransitioner) => {
    let inputError = false;
    matches.forEach(match => {
      const procInputCityStr = stringManipulation.processString(input.value);
      const procMatchStr = stringManipulation.processString(match.firstElementChild.innerText);
      if (procInputCityStr !== procMatchStr) {
        render.renderError('INCORRECT CITY', messageTransitioner);
        inputError = true;
      } else {
        messageTransitioner.hide();
      }
    });
    return inputError;
  };
  return {
    noInput,
    checkInput,
  };
})();

export default validation;