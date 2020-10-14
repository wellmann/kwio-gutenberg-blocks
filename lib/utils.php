<?php

namespace KWIO\GutenbergBlocks;

/**
 * Enqueue asset based on file name and file type.
 */
function enqueue_asset(string $filename, string $type, array $dependencies = []): void
{
    $path = DIR_PATH . "dist/{$filename}.{$type}";
    if (!is_readable($path)) {
        return;
    }

    $handle = PREFIX . '-' . $filename;
    $src = DIR_URL . str_replace(DIR_PATH, '', $path);
    $verHash  = substr(md5(filemtime($path)), 0, 12);
    $media = $filename === 'blocks' && !is_admin() ? 'nonblocking' : 'all';
    $blockData = BlockData::getInstance();
    $blockData->setContext($filename === 'blocks' ? 'frontend' : $filename);

    if (!function_exists(PREFIX . '\\WP_Defaults\\add_cache_busting_hash')) {
        $media = 'all';
    }

    if ($type === 'js') {
        wp_enqueue_script($handle, $src, $dependencies, $verHash, true);
    }

    if ($type === 'css') {
        wp_enqueue_style($handle, $src, $dependencies, $verHash, $media);
    }

    if ($filename === 'editor' && $type === 'js') {
        wp_localize_script($handle, 'blockOptions', [
            'defaultBlocks' => BlockCollector::DEFAULT_BLOCKS,
            'data' => $blockData->getAll()
        ]);
    }

    if ($filename === 'blocks') {
        if (!empty($blockData->getAll())) {
            wp_localize_script($handle, 'blockData', $blockData->getAll());
        }

        $criticalCssPath = DIR_PATH . 'dist/critical.css';
        if (is_readable($criticalCssPath)) {
            $criticalCss = file_get_contents($criticalCssPath);
            $criticalCss = str_replace('../../../../', content_url('/'), $criticalCss);
            wp_add_inline_style($handle, trim($criticalCss));
        }
    }
}

/**
 * Workaround until https://github.com/WordPress/gutenberg/issues/11763 is fixed.
 */
function convert_to_bem(array $classnames, string $baseClass): array
{
    return array_map(function (string $classname) use ($baseClass): string {
        if (strpos($classname, 'is-style-') !== false) {
            return str_replace('is-style-', $baseClass . '--', $classname);
        }

        return $classname;
    }, $classnames);
}

/**
 * Convert key-value pairs to string of HTML attributes.
 */
function to_tag_attr_string(array $array): string
{
    $tagAttrString = '';
    foreach ($array as $key => $value) {
        if (empty($key)) {
            continue;
        }

        if (is_array($value)) {
            $value = implode(' ', $value);
        }

        $value = esc_attr($value);
        $tagAttrString .= " {$key}=\"{$value}\"";
    }

    return $tagAttrString;
}