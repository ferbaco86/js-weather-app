
const domManipulation = (() => {
  const addClasses = (element, arrayClassNames) => {
    arrayClassNames.forEach(className => {
      element.classList.add(className);
    });
  };

  const removeClasses = (element, arrayClassNames) => {
    arrayClassNames.forEach(className => {
      element.classList.remove(className);
    });
  };

  const toggleClass = (element, classToggle) => {
    element.classList.toggle(classToggle);
  };

  const addId = (element, newId) => {
    element.id = newId;
  };

  const setRequired = (arrayInputs) => {
    arrayInputs.forEach((input) => {
      input.setAttribute('required', '');
    });
  };

  const createImage = (source, alt, parentElement, arrayClassNames = []) => {
    const img = new Image();
    img.src = source;
    img.alt = alt;

    if (arrayClassNames !== []) {
      addClasses(img, arrayClassNames);
    }

    parentElement.appendChild(img);

    return img;
  };

  const setInnerHtml = (element, text) => {
    element.innerHTML = text;
  };

  const setHtmlAttributes = (element, attribute, value) => {
    element.setAttribute(attribute, value);
  };

  const getHtmlAttributes = (element, attribute) => element.getAttribute(attribute);

  const getHtmlElement = ({ byId = '', byQueryClass = '', byQueryAllClass = '' }) => {
    let element;
    if (byId !== '') {
      element = document.getElementById(byId);
    }
    if (byQueryClass !== '') {
      element = document.querySelector(byQueryClass);
    }
    if (byQueryAllClass !== '') {
      element = document.querySelectorAll(byQueryAllClass);
    }
    return element;
  };

  const createHtmlElement = ({
    tag, parentElement, arrayClassNames = [], newId = '', text = '',
  }) => {
    const newElement = document.createElement(tag);

    if (arrayClassNames !== []) {
      addClasses(newElement, arrayClassNames);
    }
    if (newId !== '') {
      addId(newElement, newId);
    }
    if (text !== '') {
      newElement.innerHTML = text;
    }
    parentElement.appendChild(newElement);
    return newElement;
  };

  return {
    createHtmlElement,
    getHtmlElement,
    setHtmlAttributes,
    getHtmlAttributes,
    setRequired,
    addClasses,
    removeClasses,
    setInnerHtml,
    toggleClass,
    createImage,
  };
})();


export default domManipulation;