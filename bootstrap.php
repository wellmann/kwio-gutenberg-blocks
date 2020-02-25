<?php

namespace KWIO\Gutenberg_Blocks;

/**
 * @wordpress-plugin
 * Plugin Name: KWIO Gutenberg Blocks
 * Plugin URI: https://github.com/wellmann/kwio-gutenberg-blocks
 * Description: Foundation to develop custom blocks for Gutenberg.
 * Version: 1.0.0
 * Author: Kevin Wellmann
 * Author URI: http://kevin.wellmann.io
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * GitHub Plugin URI: https://github.com/wellmann/kwio-gutenberg-blocks
 */

// Do not access file directly.
if (!defined('ABSPATH')) {
    exit;
}

define(__NAMESPACE__ . '\\MAIN_FILE', __FILE__);
define(__NAMESPACE__ . '\\BASENAME', plugin_basename(MAIN_FILE));
define(__NAMESPACE__ . '\\DIR_PATH', plugin_dir_path(MAIN_FILE));
define(__NAMESPACE__ . '\\DIR_URL', plugin_dir_url(MAIN_FILE));
define(__NAMESPACE__ . '\\PREFIX', sanitize_title(explode('\\', __NAMESPACE__)[0]));

if (file_exists(DIR_PATH . 'vendor/autoload.php')) {
    include_once DIR_PATH . 'vendor/autoload.php';
}

Setup::register();
Assets::register();