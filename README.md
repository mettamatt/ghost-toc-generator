# Ghost.org Anchor Link Generator

## Description

This is a Google Chrome extension for generating a markdown list of anchor links for `h1`, `h2`, `h3` tags in the Ghost.org editor. 

The extension is designed for users of the Ghost.org blogging platform, as well as users of the open-source Ghost software, who wish to create anchor links in their posts for easy navigation.

## Installation

Since this extension is not available on the Chrome Web Store, you will need to load it manually. Here's how:

1. Clone this repository or download the zip file and unzip it.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Check the box for Developer mode in the top right.
4. Click on the `Load unpacked` button that appeared when you enabled Developer mode.
5. Navigate to the directory where you cloned or unzipped this repository and click `Select`.

The extension should now be installed and you should see its icon next to your address bar.

## Permissions

The extension requires the following permissions:

- `activeTab`: This allows the extension to interact with the active tab when you click the extension's icon.
- `clipboardWrite`: This allows the extension to write the generated markdown links to your clipboard.

## Usage

1. Open your Ghost editor and start writing your post.
2. Once you have added some `h1`, `h2`, `h3` headings, click the extension icon.
3. The extension will generate a markdown list of anchor links for your headings and copy it to your clipboard.
4. You will get an alert telling you whether the operation was successful or if there were any errors. If successful, you can paste (Ctrl+V) your copied markdown links wherever you want them in your post.

## Note

- The extension only generates the markdown links and does not insert them into the Ghost editor.
- The extension does not add id attributes to the heading elements. The actual functionality of these links would require adding the ids to the corresponding headings.
- Feel free to contribute and improve this extension based on your needs.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
