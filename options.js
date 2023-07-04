/**
 * Event listener for the 'submit' event on the options form.
 * 
 * This function prevents the form from submitting normally, then iterates over each 
 * element in the form. If the element is a checkbox, it adds an entry to an accumulator
 * object, where the key is the checkbox's name and the value is the checked state of the checkbox.
 * 
 * After all checkboxes have been processed, it saves the accumulator object to chrome storage,
 * then displays an alert to the user indicating that the options have been saved.
 */
document.getElementById('options-form').addEventListener('submit', (event) => {
  // Prevent the form from being submitted the traditional way
  event.preventDefault();

  // Reduce the form elements into an options object
  let options = Array.from(event.target.elements).reduce((acc, el) => {
    // If the form element is a checkbox, add it to the options object
    if (el.type === 'checkbox') {
      acc[el.name] = el.checked;
    }
    return acc;
  }, {});

  chrome.storage.sync.set(options, () => {
    alert('Options saved!');
  });
});

/**
 * When the window loads, this function retrieves the current values of the 'h1', 'h2', 
 * 'h3', 'h4', 'h5', and 'h6' options from chrome storage. It then iterates over the
 * result object, and for each entry, it finds the corresponding checkbox in the document 
 * and sets its checked state to the value of the entry.
 */
window.onload = () => {
  chrome.storage.sync.get(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    // Set the state of each checkbox according to the stored options
    for (let key in result) {
      document.querySelector(`input[name=${key}]`).checked = result[key];
    }
  });
};
