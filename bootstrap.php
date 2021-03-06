<?php

/**
 * @wordpress-plugin
 * Plugin Name: KWIO Gutenberg Blocks
 * Plugin URI: https://github.com/wellmann/kwio-gutenberg-blocks
 * Description: Foundation to develop custom blocks for Gutenberg.
 * Version: 4.0.0
 * Author: Kevin Wellmann
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * GitHub Plugin URI: https://github.com/wellmann/kwio-gutenberg-blocks
 */

namespace KWIO\GutenbergBlocks;

use Exception;

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
} else {
    throw new Exception('You need to run "composer update" in the following directory: ' . DIR_PATH . '.');
}

$hookFiles = [
    '/src/hooks/assets.php',
    '/src/hooks/block.php'
];

foreach ($hookFiles as $hookFile) {
    $hookFilePath = DIR_PATH . $hookFile;
    if (!file_exists($hookFilePath)) {
        return;
    }

    include_once $hookFilePath;
}