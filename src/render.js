const render = (() => {
  const renderMatches = (matches, matchList) => {
    if (matches.length > 0) {
      const html = matches.map(match => `<div class="card mb-2 match">
      <h5 class ="is-5 p-2">${match.address.name}, ${match.address.country}</h4>
      </div>`).join('');
      matchList.innerHTML = html;
    } else {
      matchList.innerHTML = '';
    }
  };
  return {
    renderMatches,
  };
})();

export default render;