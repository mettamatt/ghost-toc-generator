document.getElementById('options-form').addEventListener('submit', (event) => {
  event.preventDefault();

  let options = Array.from(event.target.elements).reduce((acc, el) => {
    if (el.type === 'checkbox') {
      acc[el.name] = el.checked;
    }
    return acc;
  }, {});

  chrome.storage.sync.set(options, () => {
    alert('Options saved!');
  });
});

window.onload = () => {
  chrome.storage.sync.get(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], (result) => {
    for (let key in result) {
      document.querySelector(`input[name=${key}]`).checked = result[key];
    }
  });
};
