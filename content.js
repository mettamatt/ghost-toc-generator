if (!window.location.pathname.includes('/ghost/')) return;

let editorPane = document.querySelector('.gh-koenig-editor-pane');
if (!editorPane) return;

let headers = Array.from(editorPane.querySelectorAll('h1, h2, h3, h4, h5, h6'));

let toc = headers.map((header, index) => {
  // Ensure each heading has an id for anchor linking
  let id = header.id || `header-${index}`;
  header.id = id;
  return `- [${header.textContent}](#${id})`;
}).join('\n');

// Copy ToC to clipboard
navigator.clipboard.writeText(toc).then(function() {
  console.log('ToC copied to clipboard');
}, function(err) {
  console.error('Failed to copy ToC: ', err);
});
