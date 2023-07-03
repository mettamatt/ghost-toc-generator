function generateMarkdownLinks() {
    try {
        const editorPane = document.querySelector('.gh-koenig-editor-pane');

        if (!editorPane) {
            alert('Error: Could not find the Ghost editor pane. Please ensure you are in the Ghost editor.');
            return;
        }

        const headings = Array.from(editorPane.querySelectorAll('h1, h2, h3'));
        if (!headings.length) {
            alert('Error: No headings (h1, h2, h3) found in the editor. Please add at least one heading.');
            return;
        }

        let markdownLinks = '';
        let lastLevel = 0;

        headings.forEach((heading, index) => {
            const text = heading.textContent.trim();
            const id = text.replace(/\s+/g, '-').toLowerCase();
            const level = parseInt(heading.tagName[1]);

            // determine the indent level
            let indent = '';
            if (level > lastLevel) {
                indent = '    '.repeat(level - 1);
            } else if (level < lastLevel) {
                indent = '    '.repeat(level - 1);
            } else {
                indent = '    '.repeat(level - 1);
            }

            // create anchor link
            const link = `${indent}${index + 1}. [${text}](#${id})\n`;

            markdownLinks += link;
            lastLevel = level;
        });

        // Copy the markdown links to clipboard and notify user
        navigator.clipboard.writeText(markdownLinks).then(function() {
            alert('Success: Markdown links copied to clipboard!');
        }, function() {
            alert('Error: Failed to copy markdown links. Please try again.');
        });
    } catch(error) {
        alert(`An unexpected error occurred: ${error.message}`);
    }
}

generateMarkdownLinks();
