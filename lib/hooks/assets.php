<?php

namespace KWIO\Gutenberg_Blocks;

add_action('enqueue_block_editor_assets', function (): void {
    enqueue_asset('editor', 'js', ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor']);
    enqueue_asset('editor', 'css', ['wp-edit-blocks']);
});

add_action('wp_enqueue_scripts', function (): void {
    enqueue_asset('blocks', 'js');
});

add_action('enqueue_block_assets', function (): void {
    enqueue_asset('blocks', 'css');
});

/**
 * Add class so we can style the editor more specifically (e.g. for front page).
 */
add_filter('admin_body_class', function (string $classes_string): string {
    if (!isset($_GET['post'])) {
        return $classes_string;
    }

    $classes = explode(' ', $classes_string);

    if ($_GET['post'] === get_option('page_on_front')) {
        $classes[] = 'is-front-page';
    }

    if ($_GET['post'] === get_option('page_for_posts')) {
        $classes[] = 'is-home';
    }

    if ($template = get_post_meta($_GET['post'],'_wp_page_template', true)) {
        $classes[] = 'template-' . sanitize_html_class($template);
    }

    return implode(' ', $classes);
});