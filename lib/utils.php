<?php

namespace KWIO\Gutenberg_Blocks;

/**
 * Enqueue asset based on file name and file type.
 */
function enqueue_asset(string $filename, string $type, array $dependencies = []): void {
    $path = DIR_PATH . "dist/{$filename}.{$type}";
    if (!is_readable($path)) {
        return;
    }

    $handle = PREFIX . '-' . $filename;
    $src = DIR_URL . str_replace(DIR_PATH, '', $path);
    $ver_hash  = substr(md5(filemtime($path)), 0, 12);
    $media = $filename === 'blocks' && !is_admin() ? 'nonblocking' : 'all';
    $block_data = Block_Data::get_instance();
    $block_data->set_context($filename === 'blocks' ? 'frontend' : $filename);

    if (!function_exists(PREFIX . '\\WP_Defaults\\add_cache_busting_hash')) {
        $media = 'all';
    }

    if ($type === 'js') {
        wp_enqueue_script($handle, $src, $dependencies, $ver_hash, true);
    }

    if ($type === 'css') {
        wp_enqueue_style($handle, $src, $dependencies, $ver_hash, $media);
    }

    if ($filename === 'editor' && $type === 'js') {
        wp_localize_script($handle, 'blockOptions', [
            'defaultBlocks' => Block_Collector::DEFAULT_BLOCKS,
            'data' => $block_data->get_all()
        ]);
    }

    if ($filename === 'blocks') {
        if (!empty($block_data->get_all())) {
            wp_localize_script($handle, 'blockData', $block_data->get_all());
        }

        $critical_css_path = DIR_PATH . 'dist/critical.css';
        if (is_readable($critical_css_path)) {
            $critical_css = file_get_contents($critical_css_path);
            $critical_css = str_replace('../../../../', content_url('/'), $critical_css);
            wp_add_inline_style($handle, trim($critical_css));
        }
    }
}