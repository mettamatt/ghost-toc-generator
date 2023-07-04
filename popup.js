document.addEventListener('DOMContentLoaded', (event) => {
    try {
        const generateButton = document.getElementById('generate');
        const status = document.getElementById('status');

        generateButton.addEventListener('click', async () => {
            try {
                generateButton.disabled = true;
                status.textContent = 'Generating ToC...';

                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

                if (tab.url.startsWith('chrome://')) {
                    throw new Error('This extension cannot be used on internal Chrome pages.');
                }

                if (tab.url.startsWith('file://')) {
                    throw new Error('This extension cannot be used on local files due to Chrome\'s security restrictions.');
                }

                // Ensure the extension is used on a Ghost editor page
                if (!tab.url.includes('/ghost/')) {
                    throw new Error('This extension is designed to be used in Ghost editor.');
                }

                const storage = await chrome.storage.sync.get({
                    h1: true,
                    h2: true,
                    h3: true,
                    h4: true,
                    h5: true,
                    h6: true
                });

                const headingSelectors = Object.entries(storage)
                    .filter(([key, value]) => value)
                    .map(([key]) => key)
                    .join(', ');

                const results = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: generateAndCopyToC,
                    args: [headingSelectors]
                });

                if (chrome.runtime.lastError) {
                    throw new Error(chrome.runtime.lastError.message);
                }

                if (results[0].result === false) {
                    throw new Error('No headings found for ToC generation. Please ensure the document contains the appropriate headings.');
                }

                status.textContent = 'ToC copied to clipboard!';
                status.classList.add('update');
                
                setTimeout(() => {
                    status.textContent = '';
                    status.classList.remove('update');
                }, 3000);
            } catch (error) {
                console.error('An error occurred:', error);
                status.textContent = `Error: ${error.message}`;
                status.classList.add('error', 'update');
            } finally {
                generateButton.disabled = false;
            }
        });
    } catch (error) {
        console.error('An error occurred during DOM content loading:', error);
    }
});

/**
 * Generate a Table of Contents (ToC) based on the specified headings in a Ghost post,
 * and copy the generated ToC to the clipboard.
 *
 * The function generates an ID for each header based on its text, with special characters
 * replaced by hyphens and a numeric suffix added if necessary to ensure uniqueness. It then
 * constructs a Markdown-style link for each header, with the link text being the header text
 * and the link target being the header's ID. The links are indented based on the heading level
 * to reflect the document structure.
 *
 * After generating the ToC, the function copies it to the clipboard by creating a temporary
 * textarea element, setting its value to the ToC, selecting the text, and executing the
 * 'copy' command. It then removes the temporary textarea.
 *
 * @param {string} headingSelectors - A comma-separated list of selectors for the heading elements to include in the ToC.
 * @returns {boolean} - Returns true if the ToC was successfully generated and copied, or false if the editor pane was not found or no headers were found.
 */
function generateAndCopyToC(headingSelectors) {
    let editorPane = document.querySelector('.koenig-react-editor');
    if (!editorPane) return false;

    let headers = Array.from(editorPane.querySelectorAll(headingSelectors));

    if (headers.length === 0) {
        console.log('No headers found'); // Logging in case no headers are found
        return false;
    }

    let toc = headers.map((header, index) => {
        // Get the trimmed text content of the header
        let text = header.textContent.trim();

        // Skip headers with no text
        if (!text) {
            return null;
        }

        // Generate an ID for the anchor link based on the header's text
        let id = text.toLowerCase().replace(/[\s]+/g, '-');

        // Encode the ID to ensure it's safe for URL use
        id = encodeURIComponent(id);

        // Append a number suffix if the ID already exists
        let originalId = id;
        let suffix = 2;
        while (document.querySelector('#' + CSS.escape(id))) {
            id = `${originalId}-${suffix}`;
            suffix++;
        }

        // Assign the id to the header
        header.id = id;

        // Determine the heading level
        let level = parseInt(header.tagName.slice(1));

        // Indent the ToC based on the heading level
        let indentation = '\t'.repeat(level - 1);

        // Return markdown style link with indentation for the ToC
        return `${indentation}- [${header.textContent}](#${encodeURIComponent(id)})`;
    }).filter(Boolean).join('\n');

    // Create a temporary textarea element to copy the text to clipboard
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = toc;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    return true;
}
