const render = (() => {
  const renderMatches = (matches, matchList) => {
    if (matches.length > 0) {
      const html = matches.map(match => `<div class="card mb-2 match" data-lat = "${match.lat}" data-lon = "${match.lon}">
      <h5 class ="p-2">${match.address.name}, ${match.address.country}</h5>
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