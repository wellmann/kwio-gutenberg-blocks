# Gutenberg Blocks

WordPress plugin to facilitate the development of Gutenberg blocks.

## Features

* auto-registration of blocks
*  only attributes are saved in post content - no markup
* no need to pass `value`,`setAttributes` and `className` to each component when using our custom wrapper components
* Improved default components
* `create-block` CLI
* class names follow the BEM pattern
* default example attributes

Import `InspectorControl`, `MediaPlaceholderWrapper` and `RichTextWrapper` from `components` instead of `wp.blockEditor` to write less repetitive code.  
You only need to add a `name` prop which corresponds to the attribute.

```
 <RichText
    value={ attributes.text }
    onChange={ (text) => setAttributes({ text }) } />
```
vs.
```
 <RichText name="text" />
```

A selected set of Gutenberg default modules are grouped into a WordPress category, while blocks belonging to this plugins namespace are put into their own category as well.

## Setup

```
git clone git@github.com:wellmann/kwio-gutenberg-blocks && cd kwio-gutenberg-blocks && npm i
```

## Commands

* `node tasks/setup.js [-p|--prefix]` - Replaces `KWIO` prefix throughout the entire plugin.
* `npm start` - Start file watcher.
* `npm run build` - Create all necessary assets.
* `create-block <name> [options]` - Run custom script to create block with boilerplate code. 

## Creating custom blocks
To create custom blocks run `create-block <name>`. The blocks folder will be created in `src/blocks/<name>` along with the required files and boilerplate code. 

>Note: You have to `npm link` before using this command.

| Flag | Alias | Description |
| :--- | :--- | :--- |
| `--dynamic` | `-d` | A block.php file will be added to the blocks folder.
| `--fullwidth` | `-w` | Make block fullwidth by default.
| `--shared-atts` | `-a` | An attributes.json file will be added to the blocks folder.
| `--critical` | `-c` | Instead of a style.scss a style.critical.scss and an editor.scss file will be added to the blocks folder.
| `--script-js` | `-j` | A script.js file will be added to the blocks folder.
| `--editor-css` | `-e` | An editor.scss file will be added to the blocks folder.
| `--help` | `-h` | Display help for command. 

## Anatomy of a block

### attributes.json *(optional)*

* Should be used when default values for attributes are set, so that both JavaScript and PHP have access to them.

### block.js

* Exports an object with the properties of the [block configuration object](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/).
* If the `edit()` function is ommitted the editor will try to render the PHP output via the `ServerSideRender` component.
* The `save()` function is ommitted on purpose, since all options shall be saved as an object literal in the post content.

### block.php *(optional)*

* Class that extends `Base_Block` and implements a custom render function. You can add additional classes to the wrapper element, add JSON data to the front end. Should be used when dynamic data will be rendered.

### editor.scss *(optional)*

* Additional admin styles for the block. Should not be necessary most of the time.

### script.js *(optional)*

* Any JavaScript functionality belonging in the front end. Delete file if it is not used since it will probably add an unnecessary script request.

### style.scss

* Front end styles for the block.

### style.critical.scss

* Should be used instead of the `style.scss` when block is displayed above the fold. Styles are put in a seperate `critical.css` file which is then inlined into the html.
For editor styles create the `editor.scss` file.

### view.twig

* Inner HTML markup for the block, that gets populated with data from the attributes, any additional data defined in the `block.php` file and data of the current post.

## Usage of styles & scripts

The blocks assets are automatically compiled, combined and minified into the `dist` folder (including *.map files).  
The following variables can be used inside `*.scss` files:
* `assets_path` - holds the path to the themes `assets` folder

If used in conjunction with a specific setup and theme, variables and mixins from `<theme-name>/assets/css/_includes` can be imported and used inside the blocks `*.scss` files.

To customize these paths look into the config object of the `package.json`.  
You can use the following options to alter the defaults:

* `themeDirName`
* `themeAssets`
* `themeScssIncludes`