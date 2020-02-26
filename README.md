# Gutenberg Blocks

WordPress plugin to facilitate the development of Gutenberg blocks. Includes 4 examplary implementations.

The most common components and their use, that you will need during development, are shown in the example blocks.  
For more components refer to the handbook and the [@wordpress/components](https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-components/) package.

### Setup

```
git clone git@github.com:wellmann/kwio-gutenberg-blocks && npm install
```

#### Commands

* `create-block <name> [-d|--dynamic]` - Runs custom script to create block with boilerplate code.  
(**Note**: Run `npm link` before using this command, which in turn should be run after `node tasks/setup.js`.)
* `npm start` - Runs all watch.* scripts in parallel.
* `npm run build:editor` - Collects and combines block.js and editor.scss files from each block.
* `npm run build:frontend` - Collects and combines style.scss and script.js files from each block.
* `node tasks/setup.js [-p|--prefix]` - Replaces `KWIO` prefix throughout the entire plugin.

### Creating custom modules
To create custom modules run `create-block <name>`. The blocks folder will be created in `src/blocks/<name>` along with the required files and boilerplate code.  
Use the optional `-d` or `--dynamic` flag to create a dynamic block, which means an additional PHP class (block.php) will be generated in the blocks folder.

#### Anatomy of a block

##### block.js

* Exports an object with the properties of the [block configuration object](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/).
* The category property defaults to `common`
* The `save()` function is ommitted on purpose, since all options shall be saved as an object literal in the post content.

##### block.php *(optional)*

* Class that extends `Base_Block` and implements a custom render function.

##### editor.scss *(optional)*

* Additional admin styles for the block.

##### script.js *(optional)*

* Front end JavaScript functions.

##### style.scss

* Front end styles for the block.

##### view.php

* HTML markup for the block, that gets populated with data from the blocks attributes (and data from the `block.php` file).

### Usage of styles & scripts

The blocks assets are automatically compiled, combined and minified to their respective folders in `dist` (including *.map files).  
The following variables can be used inside `*.scss` files:
* `assets_path` - holds the path to the themes `assets` folder

If used in conjunction with a specific setup and theme, variables and mixins from `<theme-name>/assets/css/_includes` can be imported and used inside the blocks `*.scss` files.