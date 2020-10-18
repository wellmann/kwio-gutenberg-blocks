<?php

namespace KWIO\GutenbergBlocks;

add_action('enqueue_block_editor_assets', function (): void {
    wp_enqueue_script('kwio-gutenberg-blocks-editor', DIR_URL . 'dist/editor.js', ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'], false, true);
    wp_enqueue_style('kwio-gutenberg-blocks-editor', DIR_URL . 'dist/editor.css', ['wp-edit-blocks']);
});

add_action('wp_enqueue_scripts', function (): void {
    wp_enqueue_script('kwio-gutenberg-blocks', DIR_URL . 'dist/blocks.js', [], false, true);
});

add_action('enqueue_block_assets', function (): void {
    wp_enqueue_style('kwio-gutenberg-blocks', DIR_URL . 'dist/blocks.css');

    $criticalCssPath = DIR_PATH . 'dist/critical.css';
    if (is_readable($criticalCssPath)) {
        $criticalCss = file_get_contents($criticalCssPath);
        $criticalCss = str_replace('../../../../', content_url('/'), $criticalCss);
        wp_add_inline_style('kwio-gutenberg-blocks', trim($criticalCss));
    }
});

/**
 * Add class so we can style the editor more specifically (e.g. for front page).
 */
add_filter('admin_body_class', function (string $classesString): string {
    if (!isset($_GET['post'])) {
        return $classesString;
    }

    $classes = explode(' ', $classesString);

    if ($_GET['post'] === get_option('page_on_front')) {
        $classes[] = 'is-front-page';
    }

    if ($_GET['post'] === get_option('page_for_posts')) {
        $classes[] = 'is-home';
    }

    if ($template = get_post_meta($_GET['post'], '_wp_page_template', true)) {
        $classes[] = 'template-' . sanitize_html_class($template);
    }

    return implode(' ', $classes);
});