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
use KWIO\GutenbergBlocksFramework\Loader;

// Do not access file directly.
if (!defined('ABSPATH')) {
    exit;
}

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    include_once __DIR__ . '/vendor/autoload.php';
} else {
    throw new Exception('You need to run "composer update --no-dev" in the following directory: ' . __DIR__ . '.');
}

$frameworkLoader = new Loader(__FILE__);
$frameworkLoader
    ->loadBlocks('src/', __NAMESPACE__)
    ->init();