/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@cloudfour/transition-hidden-element/src/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@cloudfour/transition-hidden-element/src/index.js ***!
  \************************************************************************/
/*! exports provided: transitionHiddenElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transitionHiddenElement\", function() { return transitionHiddenElement; });\n/**\n * Transition Hidden Element\n *\n * A utility to wrap elements that need to be shown and hidden with transitions.\n *\n * Enables transitions on elements with the `hidden` attribute\n * by removing the attribute and then forcing a reflow. It also has options to\n * wait for exit animations before re-applying `hidden`.\n *\n * @param {Object} opts - Our options element, destructed into its properties\n * @param {HTMLElement} opts.element - The element we're showing and hiding\n * @param {String} opts.visibleClass - The class to add when showing the element\n * @param {String} opts.waitMode - Determine how the library should check that\n *  hiding transitions are complete. The options are `'transitionEnd'`,\n *  `'timeout'`, and `'immediate'` (to hide immediately)\n * @param  {Number} opts.timeoutDuration — If `waitMode` is set to `'timeout'`,\n *  then this determines the length of the timeout.\n * @param {String} opts.hideMode - Determine how the library should hide\n *  elements. The options are `hidden` (use the `hidden` attribute), and\n *  `display` (use the CSS `display` property). Defaults to `hidden`\n * @param {String} opts.displayValue - When using the `display` `hideMode`, this\n *  parameter determines what the CSS `display` property should be set to when\n *  the element is shown. e.g. `block`, `inline`, `inline-block`. Defaults to\n *  `block`.\n */\nfunction transitionHiddenElement({\n  element,\n  visibleClass,\n  waitMode = 'transitionend',\n  timeoutDuration,\n  hideMode = 'hidden',\n  displayValue = 'block'\n}) {\n  if (waitMode === 'timeout' && typeof timeoutDuration !== 'number') {\n    console.error(`\n      When calling transitionHiddenElement with waitMode set to timeout,\n      you must pass in a number for timeoutDuration.\n    `);\n\n    return;\n  }\n\n  // Don't wait for exit transitions if a user prefers reduced motion.\n  // Ideally transitions will be disabled in CSS, which means we should not wait\n  // before adding `hidden`.\n  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n    waitMode = 'immediate';\n  }\n\n  /**\n   * An event listener to add `hidden` after our animations complete.\n   * This listener will remove itself after completing.\n   */\n  const listener = e => {\n    // Confirm `transitionend` was called on  our `element` and didn't bubble\n    // up from a child element.\n    if (e.target === element) {\n      applyHiddenAttributes();\n\n      element.removeEventListener('transitionend', listener);\n    }\n  };\n\n  const applyHiddenAttributes = () => {\n    if(hideMode === 'display') {\n      element.style.display = 'none';\n    } else {\n      element.setAttribute('hidden', true);\n    }\n  }\n\n  const removeHiddenAttributes = () => {\n    if(hideMode === 'display') {\n      element.style.display = displayValue;\n    } else {\n      element.removeAttribute('hidden');\n    }\n  }\n\n  return {\n    /**\n     * Show the element\n     */\n    show() {\n      /**\n       * This listener shouldn't be here but if someone spams the toggle\n       * over and over really fast it can incorrectly stick around.\n       * We remove it just to be safe.\n       */\n      element.removeEventListener('transitionend', listener);\n\n      /**\n       * Similarly, we'll clear the timeout in case it's still hanging around.\n       */\n      if (this.timeout) {\n        clearTimeout(this.timeout);\n      }\n\n      removeHiddenAttributes();\n\n      /**\n       * Force a browser re-paint so the browser will realize the\n       * element is no longer `hidden` and allow transitions.\n       */\n      const reflow = element.offsetHeight;\n\n      element.classList.add(visibleClass);\n    },\n\n    /**\n     * Hide the element\n     */\n    hide() {\n      if (waitMode === 'transitionend') {\n        element.addEventListener('transitionend', listener);\n      } else if (waitMode === 'timeout') {\n        this.timeout = setTimeout(() => {\n          applyHiddenAttributes();\n        }, timeoutDuration);\n      } else {\n        applyHiddenAttributes();\n      }\n\n      // Add this class to trigger our animation\n      element.classList.remove(visibleClass);\n    },\n\n    /**\n     * Toggle the element's visibility\n     */\n    toggle() {\n      if (this.isHidden()) {\n        this.show();\n      } else {\n        this.hide();\n      }\n    },\n\n    /**\n     * Tell whether the element is hidden or not.\n     */\n    isHidden() {\n      /**\n       * The hidden attribute does not require a value. Since an empty string is\n       * falsy, but shows the presence of an attribute we compare to `null`\n       */\n      const hasHiddenAttribute = element.getAttribute('hidden') !== null;\n\n      const isDisplayNone = element.style.display === 'none';\n\n      const hasVisibleClass = [...element.classList].includes(visibleClass);\n\n      return hasHiddenAttribute || isDisplayNone || !hasVisibleClass;\n    },\n\n    // A placeholder for our `timeout`\n    timeout: null\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/@cloudfour/transition-hidden-element/src/index.js?");

/***/ }),

/***/ "./node_modules/bulma-switch/dist/css/bulma-switch.min.css":
/*!*****************************************************************!*\
  !*** ./node_modules/bulma-switch/dist/css/bulma-switch.min.css ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./node_modules/bulma-switch/dist/css/bulma-switch.min.css?");

/***/ }),

/***/ "./node_modules/bulma/css/bulma.css":
/*!******************************************!*\
  !*** ./node_modules/bulma/css/bulma.css ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./node_modules/bulma/css/bulma.css?");

/***/ }),

/***/ "./node_modules/weathericons/css/weather-icons.css":
/*!*********************************************************!*\
  !*** ./node_modules/weathericons/css/weather-icons.css ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./node_modules/weathericons/css/weather-icons.css?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/css/style.css?");

/***/ }),

/***/ "./src/js/DOMhelpers.js":
/*!******************************!*\
  !*** ./src/js/DOMhelpers.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nconst domManipulation = (() => {\n  const addClasses = (element, arrayClassNames) => {\n    arrayClassNames.forEach(className => {\n      element.classList.add(className);\n    });\n  };\n\n  const removeClasses = (element, arrayClassNames) => {\n    arrayClassNames.forEach(className => {\n      element.classList.remove(className);\n    });\n  };\n\n  const toggleClass = (element, classToggle) => {\n    element.classList.toggle(classToggle);\n  };\n\n  const addId = (element, newId) => {\n    element.id = newId;\n  };\n\n  const setRequired = (arrayInputs) => {\n    arrayInputs.forEach((input) => {\n      input.setAttribute('required', '');\n    });\n  };\n\n  const createImage = (source, alt, parentElement, arrayClassNames = []) => {\n    const img = new Image();\n    img.src = source;\n    img.alt = alt;\n\n    if (arrayClassNames !== []) {\n      addClasses(img, arrayClassNames);\n    }\n\n    parentElement.appendChild(img);\n\n    return img;\n  };\n\n  const setInnerHtml = (element, text) => {\n    element.innerHTML = text;\n  };\n\n  const setHtmlAttributes = (element, attribute, value) => {\n    element.setAttribute(attribute, value);\n  };\n\n  const getHtmlAttributes = (element, attribute) => element.getAttribute(attribute);\n\n  const getHtmlElement = ({ byId = '', byQueryClass = '', byQueryAllClass = '' }) => {\n    let element;\n    if (byId !== '') {\n      element = document.getElementById(byId);\n    }\n    if (byQueryClass !== '') {\n      element = document.querySelector(byQueryClass);\n    }\n    if (byQueryAllClass !== '') {\n      element = document.querySelectorAll(byQueryAllClass);\n    }\n    return element;\n  };\n\n  const createHtmlElement = ({\n    tag, parentElement, arrayClassNames = [], newId = '', text = '',\n  }) => {\n    const newElement = document.createElement(tag);\n\n    if (arrayClassNames !== []) {\n      addClasses(newElement, arrayClassNames);\n    }\n    if (newId !== '') {\n      addId(newElement, newId);\n    }\n    if (text !== '') {\n      newElement.innerHTML = text;\n    }\n    parentElement.appendChild(newElement);\n    return newElement;\n  };\n\n  return {\n    createHtmlElement,\n    getHtmlElement,\n    setHtmlAttributes,\n    getHtmlAttributes,\n    setRequired,\n    addClasses,\n    removeClasses,\n    setInnerHtml,\n    toggleClass,\n    createImage,\n  };\n})();\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (domManipulation);\n\n//# sourceURL=webpack:///./src/js/DOMhelpers.js?");

/***/ }),

/***/ "./src/js/convertions.js":
/*!*******************************!*\
  !*** ./src/js/convertions.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst convertion = (() => {\n  const farenheitToCelsius = (farenheit) => {\n    const newTemp = (farenheit - 32) * (5 / 9);\n    return newTemp;\n  };\n\n  const celsiusToFarenheit = (celsius) => {\n    const newTemp = (celsius * (9 / 5)) + 32;\n    return newTemp;\n  };\n\n  const unixTimestampToWeekDay = (unixTime) => {\n    const milliseconds = unixTime * 1000;\n    const newDate = new Date(milliseconds);\n    return newDate.toLocaleString('en-US', { weekday: 'long' });\n  };\n  return {\n    celsiusToFarenheit,\n    farenheitToCelsius,\n    unixTimestampToWeekDay,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (convertion);\n\n//# sourceURL=webpack:///./src/js/convertions.js?");

/***/ }),

/***/ "./src/js/data.json":
/*!**************************!*\
  !*** ./src/js/data.json ***!
  \**************************/
/*! exports provided: 01d, 01n, 02d, 02n, 03d, 03n, 04d, 04n, 09d, 09n, 10d, 10n, 11d, 11n, 13d, 13n, 50d, 50n, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"01d\\\":\\\"https://fernando-bc.com/weather-icons/01d.svg\\\",\\\"01n\\\":\\\"https://fernando-bc.com/weather-icons/01n.svg\\\",\\\"02d\\\":\\\"https://fernando-bc.com/weather-icons/02d.svg\\\",\\\"02n\\\":\\\"https://fernando-bc.com/weather-icons/02n.svg\\\",\\\"03d\\\":\\\"https://fernando-bc.com/weather-icons/03d.svg\\\",\\\"03n\\\":\\\"https://fernando-bc.com/weather-icons/03n.svg\\\",\\\"04d\\\":\\\"https://fernando-bc.com/weather-icons/04d.svg\\\",\\\"04n\\\":\\\"https://fernando-bc.com/weather-icons/04n.svg\\\",\\\"09d\\\":\\\"https://fernando-bc.com/weather-icons/09d.svg\\\",\\\"09n\\\":\\\"https://fernando-bc.com/weather-icons/09n.svg\\\",\\\"10d\\\":\\\"https://fernando-bc.com/weather-icons/10d.svg\\\",\\\"10n\\\":\\\"https://fernando-bc.com/weather-icons/10n.svg\\\",\\\"11d\\\":\\\"https://fernando-bc.com/weather-icons/11d.svg\\\",\\\"11n\\\":\\\"https://fernando-bc.com/weather-icons/11n.svg\\\",\\\"13d\\\":\\\"https://fernando-bc.com/weather-icons/13d.svg\\\",\\\"13n\\\":\\\"https://fernando-bc.com/weather-icons/13n.svg\\\",\\\"50d\\\":\\\"https://fernando-bc.com/weather-icons/50d.svg\\\",\\\"50n\\\":\\\"https://fernando-bc.com/weather-icons/50n.svg\\\"}\");\n\n//# sourceURL=webpack:///./src/js/data.json?");

/***/ }),

/***/ "./src/js/geolocation.js":
/*!*******************************!*\
  !*** ./src/js/geolocation.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/js/render.js\");\n\n\nconst geoLocation = (() => {\n  const coordinates = {};\n  const iqApiKey = \"pk.9d6262200cb2ee5f3c12342c35022d22\";\n\n  const setCoordinates = (lat, lon) => {\n    coordinates.lat = lat;\n    coordinates.lon = lon;\n  };\n\n  const getCityLocation = async (cityName, matchList) => {\n    try {\n      const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${iqApiKey}&q=${cityName}&limit=5&tag=place%3Acity&accept-language=en`, { mode: 'cors' });\n      const getData = await response.json();\n\n      _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderMatches(getData, matchList);\n      return getData;\n    } catch (error) {\n      return error;\n    }\n  };\n  return {\n    coordinates,\n    getCityLocation,\n    setCoordinates,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (geoLocation);\n\n//# sourceURL=webpack:///./src/js/geolocation.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bulma_css_bulma_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bulma/css/bulma.css */ \"./node_modules/bulma/css/bulma.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var bulma_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bulma-switch */ \"./node_modules/bulma-switch/dist/css/bulma-switch.min.css\");\n/* harmony import */ var weathericons_css_weather_icons_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! weathericons/css/weather-icons.css */ \"./node_modules/weathericons/css/weather-icons.css\");\n/* harmony import */ var _cloudfour_transition_hidden_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cloudfour/transition-hidden-element */ \"./node_modules/@cloudfour/transition-hidden-element/src/index.js\");\n/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weather */ \"./src/js/weather.js\");\n/* harmony import */ var _geolocation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./geolocation */ \"./src/js/geolocation.js\");\n/* harmony import */ var _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DOMhelpers */ \"./src/js/DOMhelpers.js\");\n/* harmony import */ var _stringHelpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stringHelpers */ \"./src/js/stringHelpers.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./render */ \"./src/js/render.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./validation */ \"./src/js/validation.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst inputCity = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byId: 'search' });\nconst matchList = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byId: 'matches' });\nconst getWeatherBtn = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byId: 'search-btn' });\nconst downArrow = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byId: 'down-arrow' });\nconst cardFooter = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byQueryClass: '.card-footer' });\nconst tempSwitch = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byQueryClass: '.switch' });\nconst messageContainer = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byQueryClass: '.message' });\nconst menuTransitioner = Object(_cloudfour_transition_hidden_element__WEBPACK_IMPORTED_MODULE_4__[\"transitionHiddenElement\"])({\n  element: cardFooter,\n  visibleClass: 'is-cf-active',\n  hideMode: 'display',\n  displayValue: 'flex',\n  timeoutDuration: '100ms',\n});\nconst messageTransitioner = Object(_cloudfour_transition_hidden_element__WEBPACK_IMPORTED_MODULE_4__[\"transitionHiddenElement\"])({\n  element: messageContainer,\n  visibleClass: 'is-message-active',\n  hideMode: 'display',\n});\n\nconst getSetCoordinates = (element) => {\n  const lat = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlAttributes(element, 'data-lat');\n  const lon = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlAttributes(element, 'data-lon');\n  _geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].setCoordinates(lat, lon);\n};\n\ninputCity.addEventListener('input', () => {\n  _validation__WEBPACK_IMPORTED_MODULE_10__[\"default\"].noInput(inputCity, messageTransitioner);\n  _geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getCityLocation(inputCity.value, matchList);\n  matchList.childNodes.forEach(element => {\n    const procInputCityStr = _stringHelpers__WEBPACK_IMPORTED_MODULE_8__[\"default\"].processString(inputCity.value);\n    const procMatchStr = _stringHelpers__WEBPACK_IMPORTED_MODULE_8__[\"default\"].processString(element.innerText);\n    if (procInputCityStr === procMatchStr) {\n      getSetCoordinates(element);\n    }\n  });\n});\n\nmatchList.addEventListener('click', (e) => {\n  const matchTarget = e.target;\n  if (matchTarget.nodeName === 'H5') {\n    const card = matchTarget.parentNode;\n    inputCity.value = matchTarget.innerText;\n    getSetCoordinates(card);\n    matchList.innerHTML = '';\n  }\n});\n\nconst retrieveData = async (lat, lon) => {\n  const weatherData = await _weather__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getWeatherData(lat,\n    lon);\n  return weatherData;\n};\n\nconst showInitialCity = async () => {\n  const data = await retrieveData('-33.4372', '-70.6506');\n  _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].renderCurrentWeather(data, _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].tempScale, 'Santiago, Chile');\n  _geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].setCoordinates('-33.4372', '-70.6506');\n};\n\nshowInitialCity();\n\ngetWeatherBtn.addEventListener('click', async (e) => {\n  e.preventDefault();\n  const data = await retrieveData(_geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].coordinates.lat, _geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].coordinates.lon);\n  const matches = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byQueryAllClass: '.match' });\n  const inputCheck = _validation__WEBPACK_IMPORTED_MODULE_10__[\"default\"].checkInput(matches, inputCity, messageTransitioner);\n  if (inputCity.validity.valueMissing || inputCheck) {\n    _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].renderError('INCORRECT CITY ON INPUT...', messageTransitioner);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].addClasses(inputCity, ['is-danger']);\n  } else {\n    inputCity.setCustomValidity('');\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].removeClasses(inputCity, ['is-danger']);\n    messageTransitioner.hide();\n    const form = _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].getHtmlElement({ byQueryClass: '.form' });\n    _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].renderCurrentWeather(data, _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].tempScale, inputCity.value);\n    form.reset();\n  }\n});\n\ndownArrow.addEventListener('click', () => {\n  _DOMhelpers__WEBPACK_IMPORTED_MODULE_7__[\"default\"].toggleClass(downArrow, 'is-active');\n  menuTransitioner.toggle();\n});\n\ntempSwitch.addEventListener('click', async () => {\n  _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].tempScale = !_render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].tempScale;\n  const data = await retrieveData(_geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].coordinates.lat, _geolocation__WEBPACK_IMPORTED_MODULE_6__[\"default\"].coordinates.lon);\n  _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].renderCurrentWeather(data, _render__WEBPACK_IMPORTED_MODULE_9__[\"default\"].tempScale);\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/render.js":
/*!**************************!*\
  !*** ./src/js/render.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMhelpers */ \"./src/js/DOMhelpers.js\");\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.json */ \"./src/js/data.json\");\nvar _data_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data.json */ \"./src/js/data.json\", 1);\n/* harmony import */ var _convertions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convertions */ \"./src/js/convertions.js\");\n\n\n\n\n\nconst render = (() => {\n  const tempScale = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'switch' }).checked;\n\n  const renderError = (message, messageTransition) => {\n    const text = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'message-text' });\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(text, message);\n    messageTransition.show();\n  };\n\n  const removeError = () => {\n    const container = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryClass: '.message' });\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeClasses(container, ['is-message-active']);\n  };\n\n  const renderCelsius = (weatherInfo) => {\n    const tempCelsius = Object.keys(weatherInfo.current).filter(key => key !== 'icon')\n      .map(key => weatherInfo.current[key]);\n    return tempCelsius;\n  };\n\n  const renderWeeklyCelsius = (weatherInfo) => {\n    const weeklyTempCelsius = [];\n    const weeklyInfoCelsius = Object.keys(weatherInfo).filter(key => key !== 'current')\n      .map(key => weatherInfo[key]);\n    weeklyInfoCelsius.forEach(temp => weeklyTempCelsius.push(Object.keys(temp)\n      .filter(key => key !== 'icon' && key !== 'dt')\n      .map(key => temp[key])));\n    return weeklyTempCelsius;\n  };\n\n  const renderFarenheit = (weatherInfo) => {\n    const tempFarenheit = Object.keys(weatherInfo.current).filter(key => key !== 'icon')\n      .map(key => _convertions__WEBPACK_IMPORTED_MODULE_2__[\"default\"].celsiusToFarenheit(weatherInfo.current[key]));\n    return tempFarenheit;\n  };\n\n  const renderWeeklyFarenheit = (weatherInfo) => {\n    const weeklyTempFarenheit = [];\n    const weeklyInfoFarenheit = Object.keys(weatherInfo).filter(key => key !== 'current')\n      .map(key => weatherInfo[key]);\n    weeklyInfoFarenheit.forEach(temp => weeklyTempFarenheit.push(Object.keys(temp)\n      .filter(key => key !== 'icon' && key !== 'dt')\n      .map(key => _convertions__WEBPACK_IMPORTED_MODULE_2__[\"default\"].celsiusToFarenheit(temp[key]))));\n    return weeklyTempFarenheit;\n  };\n\n  const renderMatches = (matches, matchList) => {\n    if (matches.length > 0) {\n      const html = matches.map(match => `<div class=\"card mb-2 match\" data-lat = \"${match.lat}\" data-lon = \"${match.lon}\">\n      <h5 class =\"p-2\">${match.address.name}, ${match.address.country}</h5>\n      </div>`).join('');\n      matchList.innerHTML = html;\n    } else {\n      matchList.innerHTML = '';\n    }\n  };\n\n  const roundTemps = (temps) => temps.map(temp => Math.round(temp));\n\n  const renderWeatherIcon = (data, icon) => {\n    if (!_DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryClass: 'img' })) {\n      const parentElement = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'wicon-container' });\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createImage(data[icon], 'weather icon', parentElement, ['wicon']);\n    } else {\n      const previousIcon = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryClass: 'img' });\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setHtmlAttributes(previousIcon, 'src', data[icon]);\n    }\n  };\n\n  const renderWeeklyIcon = (weatherInfo) => {\n    const weeklyIcons = [];\n    const weeklyInfo = Object.keys(weatherInfo).filter(key => key !== 'current')\n      .map(key => weatherInfo[key]);\n    weeklyInfo.forEach(icon => weeklyIcons.push(Object.keys(icon)\n      .filter(key => key === 'icon')\n      .map(key => (icon[key]))));\n    return weeklyIcons;\n  };\n\n  const renderDt = (weatherInfo) => {\n    const weeklyDt = [];\n    const weeklyInfo = Object.keys(weatherInfo).filter(key => key !== 'current')\n      .map(key => weatherInfo[key]);\n    weeklyInfo.forEach(dt => weeklyDt.push(Object.keys(dt)\n      .filter(key => key === 'dt')\n      .map(key => (dt[key]))));\n    return weeklyDt;\n  };\n\n\n  const setTemps = (tempElement, feelElement, minElement, maxElement, temps) => {\n    const roundedTemps = roundTemps(temps);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(tempElement, roundedTemps[0]);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(feelElement, roundedTemps[1]);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(minElement, roundedTemps[2]);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(maxElement, roundedTemps[3]);\n  };\n\n  const setMinWeeklyTemps = (minElement, temps, index) => {\n    const roundedTemps = roundTemps(temps[index]);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(minElement, roundedTemps[0]);\n  };\n\n  const setMaxWeeklyTemps = (maxElement, temps, index) => {\n    const roundedTemps = roundTemps(temps[index]);\n    _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(maxElement, roundedTemps[1]);\n  };\n\n  const renderCurrentWeather = (weatherInfo, tempScale, currentCity = null) => {\n    const scalesText = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryAllClass: '.scale' });\n    const cityTitle = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'current-city' });\n    const currentTemp = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'current-temp' });\n    const currentFeel = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'current-feel' });\n    const currentMin = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'current-min' });\n    const currentMax = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byId: 'current-max' });\n    const weeklyMin = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryAllClass: '.week-min' });\n    const weeklyMax = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryAllClass: '.week-max' });\n    const weeklyIconsElement = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryAllClass: '.week-icon' });\n    const weeklyDaysTitle = _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHtmlElement({ byQueryAllClass: '.week-title' });\n    const weeklyIconsCodes = renderWeeklyIcon(weatherInfo);\n    const weeklyDaysDt = renderDt(weatherInfo);\n\n    const currentIcon = weatherInfo.current.icon;\n\n    if (currentCity !== null) {\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(cityTitle, currentCity);\n    }\n\n    if (!tempScale) {\n      scalesText.forEach(scale => (_DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(scale, 'ºC')));\n      const celsiusTemps = renderCelsius(weatherInfo);\n      const weeklyCelsiusTemps = renderWeeklyCelsius(weatherInfo);\n      weeklyMin.forEach((min, index) => { setMinWeeklyTemps(min, weeklyCelsiusTemps, index); });\n      weeklyMax.forEach((max, index) => { setMaxWeeklyTemps(max, weeklyCelsiusTemps, index); });\n      setTemps(currentTemp, currentFeel, currentMin, currentMax, celsiusTemps);\n    } else {\n      scalesText.forEach(scale => (_DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(scale, 'ºF')));\n      const farenheitTemps = renderFarenheit(weatherInfo);\n      const weeklyFarenheitTemps = renderWeeklyFarenheit(weatherInfo);\n      weeklyMin.forEach((min, index) => { setMinWeeklyTemps(min, weeklyFarenheitTemps, index); });\n      weeklyMax.forEach((max, index) => { setMaxWeeklyTemps(max, weeklyFarenheitTemps, index); });\n      setTemps(currentTemp, currentFeel, currentMin, currentMax, farenheitTemps);\n    }\n\n    weeklyIconsElement.forEach((icon, index) => {\n      icon.classList.forEach((iconClass) => {\n        if (iconClass !== 'wi' && iconClass !== 'title'\n        && iconClass !== 'is-3' && iconClass !== 'mb-5'\n        && iconClass !== 'week-icon') {\n          _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeClasses(icon, [iconClass]);\n        }\n      });\n\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addClasses(icon, [`wi-owm-${weeklyIconsCodes[index]}`]);\n    });\n\n    weeklyDaysTitle.forEach((title, index) => _DOMhelpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setInnerHtml(title,\n      _convertions__WEBPACK_IMPORTED_MODULE_2__[\"default\"].unixTimestampToWeekDay(weeklyDaysDt[index])));\n\n    renderWeatherIcon(_data_json__WEBPACK_IMPORTED_MODULE_1__, currentIcon);\n  };\n  return {\n    renderMatches,\n    renderCurrentWeather,\n    renderCelsius,\n    renderWeeklyCelsius,\n    renderFarenheit,\n    renderError,\n    removeError,\n    tempScale,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (render);\n\n//# sourceURL=webpack:///./src/js/render.js?");

/***/ }),

/***/ "./src/js/stringHelpers.js":
/*!*********************************!*\
  !*** ./src/js/stringHelpers.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst stringManipulation = (() => {\n  const lowerCase = (str) => str.toLowerCase();\n  const removeWhiteSpace = (str) => str.replace(/\\s+/g, '');\n\n  const processString = (str) => {\n    let newStr = lowerCase(str);\n    newStr = removeWhiteSpace(newStr);\n    return newStr;\n  };\n  return {\n    processString,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stringManipulation);\n\n//# sourceURL=webpack:///./src/js/stringHelpers.js?");

/***/ }),

/***/ "./src/js/validation.js":
/*!******************************!*\
  !*** ./src/js/validation.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/js/render.js\");\n/* harmony import */ var _stringHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringHelpers */ \"./src/js/stringHelpers.js\");\n/* harmony import */ var _DOMhelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMhelpers */ \"./src/js/DOMhelpers.js\");\n\n\n\n\nconst validation = (() => {\n  const noInput = (input, messageTransitioner) => {\n    if (input.validity.valueMissing) {\n      input.setCustomValidity('Please add a city...');\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addClasses(input, ['is-danger']);\n    } else {\n      input.setCustomValidity('');\n      _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeError();\n      messageTransitioner.hide();\n      _DOMhelpers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].removeClasses(input, ['is-danger']);\n    }\n  };\n  const checkInput = (matches, input, messageTransitioner) => {\n    let inputError = false;\n    matches.forEach(match => {\n      const procInputCityStr = _stringHelpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].processString(input.value);\n      const procMatchStr = _stringHelpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].processString(match.firstElementChild.innerText);\n      if (procInputCityStr !== procMatchStr) {\n        _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderError('INCORRECT CITY', messageTransitioner);\n        inputError = true;\n      } else {\n        messageTransitioner.hide();\n      }\n    });\n    return inputError;\n  };\n  return {\n    noInput,\n    checkInput,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (validation);\n\n//# sourceURL=webpack:///./src/js/validation.js?");

/***/ }),

/***/ "./src/js/weather.js":
/*!***************************!*\
  !*** ./src/js/weather.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/js/render.js\");\n\n\nconst weatherManager = (() => {\n  const owApiKey = \"b13336cbd22b44de4da99c68855418eb\";\n\n  const storeWheaterInfo = (data) => {\n    const info = {\n      current: {\n        temp: data.current.temp,\n        feels: data.current.feels_like,\n        min: data.daily[0].temp.min,\n        max: data.daily[0].temp.max,\n        icon: data.current.weather[0].icon,\n      },\n      day1: {\n        dt: data.daily[1].dt,\n        min: data.daily[1].temp.min,\n        max: data.daily[1].temp.max,\n        icon: data.daily[1].weather[0].id,\n      },\n      day2: {\n        dt: data.daily[2].dt,\n        min: data.daily[2].temp.min,\n        max: data.daily[2].temp.max,\n        icon: data.daily[2].weather[0].id,\n      },\n      day3: {\n        dt: data.daily[3].dt,\n        min: data.daily[3].temp.min,\n        max: data.daily[3].temp.max,\n        icon: data.daily[3].weather[0].id,\n      },\n      day4: {\n        dt: data.daily[4].dt,\n        min: data.daily[4].temp.min,\n        max: data.daily[4].temp.max,\n        icon: data.daily[4].weather[0].id,\n      },\n      day5: {\n        dt: data.daily[5].dt,\n        min: data.daily[5].temp.min,\n        max: data.daily[5].temp.max,\n        icon: data.daily[5].weather[0].id,\n      },\n    };\n    return info;\n  };\n\n  const getWeatherData = async (lat, lon) => {\n    try {\n      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${owApiKey}`, { mode: 'cors' });\n      const getData = await response.json();\n      return storeWheaterInfo(getData);\n    } catch (error) {\n      _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderError(error);\n      return error;\n    }\n  };\n\n  return {\n    getWeatherData,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (weatherManager);\n\n//# sourceURL=webpack:///./src/js/weather.js?");

/***/ })

/******/ });