# Gutenberg Blocks

WordPress plugin to facilitate the development of Gutenberg blocks. Includes 1 examplary implementations.

The most common components and their use, that you will need during development, are shown in the example block.  
For more components refer to the handbook and the [@wordpress/components](https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-components/) package.

### Setup

```
git clone git@github.com:wellmann/kwio-gutenberg-blocks && npm install
```

#### Commands

* `node tasks/setup.js [-p|--prefix]` - Replaces `KWIO` prefix throughout the entire plugin.
(**Note**: Run `npm link` before using this command, which in turn should be run after `node tasks/setup.js`.)
* `npm start` - Start file watcher.
* `npm run build` - Creates all necessary assets.
* `create-block <name> [-d|--dynamic]` - Runs custom script to create block with boilerplate code.  

### Creating custom modules
To create custom modules run `create-block <name>`. The blocks folder will be created in `src/blocks/<name>` along with the required files and boilerplate code.  
Use the optional `-d` or `--dynamic` flag to create a dynamic block, which means an additional PHP class (block.php) will be generated in the blocks folder.

#### Categories

A selected set of Gutenberg default modules are grouped into their own category while blocks belonging to this namespace are put in a different category.

#### Anatomy of a block

##### block.js

* Exports an object with the properties of the [block configuration object](https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/).
* If the `edit()` function is ommitted the editor will try to render the PHP output via the `ServerSideRender` component.
* The `save()` function is ommitted on purpose, since all options shall be saved as an object literal in the post content.

##### block.php *(optional)*

* Class that extends `Base_Block` and implements a custom render function. You can add additional classes to the wrapper element, add JSON data to the front end or set default values for the attributes. Should be used when dynamic data will be rendered.

##### editor.scss *(optional)*

* Additional admin styles for the block. Should not be necessary most of the time.

##### script.js *(optional)*

* Any JavaScript functionality belonging in the front end. Delete file if it is not used since it will probably add an unnecessary script request.

##### style.scss

* Front end styles for the block.

##### style.critical.scss

* Should be used instead of the `style.scss` when block is displayed above the fold. Styles are put in a seperate `critical.css` file which is then inlined into the html.
For editor styles create the `editor.scss` file.

##### view.twig

* Inner HTML markup for the block, that gets populated with data from the attributes, any additional data defined in the `block.php` file and data of the current post.

### Usage of styles & scripts

The blocks assets are automatically compiled, combined and minified to their respective folders in `dist` (including *.map files).  
The following variables can be used inside `*.scss` files:
* `assets_path` - holds the path to the themes `assets` folder

If used in conjunction with a specific setup and theme, variables and mixins from `<theme-name>/assets/css/_includes` can be imported and used inside the blocks `*.scss` files.

To customize these paths look into the config object of the `package.json`.  
You can use the following options to alter the defaults:

* `themeDirName`
* `themeAssets`
* `themeScssIncludes`