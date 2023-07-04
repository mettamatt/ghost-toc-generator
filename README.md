# Ghost CMS ToC Generator (Chrome Extension)

![Logo](./images/icon128.png)

## Description
The Ghost CMS ToC Generator is a Chrome extension designed to help Ghost  users easily generate a Table of Contents (ToC) for their posts. It is highly customizable, allowing users to choose which heading levels to include in the ToC. Once generated, the ToC can be copied to your clipboard with a single click, ready to be pasted directly into your post.

## Features
* **Selectable heading levels:** Users can customize which heading levels (H1-H6) they want to include in the ToC.
* **Single-click copy:** The generated ToC is copied directly to your clipboard, ready to be pasted into your post.
* **Real-time generation:** The ToC is generated in real-time as you write your post, ensuring it's always up-to-date.

## Permissions
The Ghost ToC Generator extension requires several permissions to operate effectively:

1. **activeTab:** This permission allows the extension to access and modify the contents of the tab that is currently active. This is used to identify the active post in Ghost.org and generate the ToC.

2. **scripting:** The scripting permission is required to inject and execute scripts in the context of web pages. This is crucial for the ToC generation process, which involves examining the page content, determining headings, and generating the ToC.

3. **clipboardWrite:** This permission allows the extension to modify the user's clipboard. After generating the ToC, the extension uses this permission to automatically copy the ToC to your clipboard.

4. **storage:** This permission allows the extension to use the chrome.storage API to store, retrieve, and track changes to user preferences. In this extension, it's used to store the user's selection of heading levels to include in the ToC.

The extension only uses these permissions when necessary and does not use them to collect or store personal information. 

## Installation
Clone the repository:
```
git clone https://github.com/mettamatt/GhostToCGenerator.git
```
Go to Chrome Extensions page (`chrome://extensions`), and then enable Developer mode. Click on "Load Unpacked" and select the cloned directory.

## Usage
1. Click on the Ghost ToC Generator extension icon while editing a post in Ghost.org. A popup will appear.
2. Click the "Generate Table of Contents" button. The extension will generate a ToC based on your selected heading levels.
3. The generated ToC will be automatically copied to your clipboard.
4. Paste the ToC into your Ghost.org post.
5. To customize the heading levels, right-click the Ghost ToC Generator extension icon, select "Options", and choose your preferred heading levels.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

