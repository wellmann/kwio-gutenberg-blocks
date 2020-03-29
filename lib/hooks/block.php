<?php

namespace KWIO\Gutenberg_Blocks;

use WP_Post;

add_action('init', function (): void {
    $block_collector = Block_Collector::get_instance();
    $blocks = glob(Block_Collector::DIR . '/*', GLOB_ONLYDIR);

    foreach ($blocks as $block) {
        $block = basename($block);
        $block_collector->register($block);
    }
});

add_filter('allowed_block_types', function (bool $allowed_blocks, WP_Post $post): array {
    $allowed_blocks = Block_Collector::DEFAULT_BLOCKS;
    $block_collector = Block_Collector::get_instance();

    return array_merge($allowed_blocks, $block_collector->get_all());
}, 10, 2);

add_filter('block_categories', function (array $categories, WP_Post $post): array {

    return array_merge($categories, [
        [
            'slug' => PREFIX,
            'title' => ucwords(PREFIX, '_')
        ],
        [
            'slug' => 'wordpress-default',
            'title' => 'WordPress'
        ]
    ]);
}, 10, 2);

add_action('admin_init', function (): void {
    $template_collector = Template_Collector::get_instance();
    $templates = glob(Template_Collector::DIR . '/*.php');

    foreach ($templates as $template) {
        $template_collector->register($template);
    }
});