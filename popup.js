document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('generate').addEventListener('click', () => {
    let status = document.getElementById('status');
    status.textContent = 'Generating ToC...';

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let activeTab = tabs[0];
    
      if (activeTab.url.startsWith('chrome://')) {
        status.textContent = 'Error: This extension cannot be used on internal Chrome pages.';
        status.classList.add('error', 'update');
        return;
      }

      if (activeTab.url.startsWith('file://')) {
        status.textContent = 'Error: This extension cannot be used on local files due to Chrome\'s security restrictions.';
        status.classList.add('error', 'update');
        return;
      }

      chrome.storage.sync.get({
        h1: true, 
        h2: true, 
        h3: true, 
        h4: true, 
        h5: true, 
        h6: true
      }, (result) => {
        let headingSelectors = [];
        for (let key in result) {
          if(result[key]) {
            headingSelectors.push(key);
          }
        }
        headingSelectors = headingSelectors.join(', ');

        try {
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: generateAndCopyToC,
            args: [headingSelectors]
          }, (results) => {
            if (chrome.runtime.lastError) {
              status.textContent = 'Error: ' + chrome.runtime.lastError.message;
              status.classList.add('error', 'update');
            } else if (results[0].result === false) {
              status.textContent = 'No headings found for ToC generation.';
              status.classList.add('update');
            } else if (results[0].result === true) {
              status.textContent = 'ToC copied to clipboard!';
              status.classList.add('update');
            }
          });
        } catch (error) {
          status.textContent = 'Error: ' + error.message;
          status.classList.add('error', 'update');
        }
      });
    });
  });
});

function generateAndCopyToC(headingSelectors) {
  if (!window.location.pathname.includes('/ghost/')) return false;

  let editorPane = document.querySelector('.gh-koenig-editor-pane');
  if (!editorPane) return false;

  let headers = Array.from(editorPane.querySelectorAll(headingSelectors));
  if (headers.length === 0) return false;

  let toc = headers.map((header, index) => {
    let id = header.id || `header-${index}`;
    header.id = id;
    return `- [${header.textContent}](#${id})`;
  }).join('\n');

  return navigator.clipboard.writeText(toc).then(() => true, () => false);
}
