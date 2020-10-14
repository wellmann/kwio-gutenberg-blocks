<?php

namespace KWIO\GutenbergBlocks;

use WP_Post;

add_action('init', function (): void {
    $blockCollector = BlockCollector::getInstance();
    $blocks = glob(BlockCollector::DIR . '/*', GLOB_ONLYDIR);

    foreach ($blocks as $block) {
        $block = basename($block);
        $blockCollector->register($block);
    }
});

add_filter('allowed_block_types', function (bool $allowedBlocks, WP_Post $post): array {
    $allowedBlocks = BlockCollector::DEFAULT_BLOCKS;
    $blockCollector = BlockCollector::getInstance();

    return array_merge($allowedBlocks, $blockCollector->getAll());
}, 10, 2);

add_filter('block_categories', function (array $categories, WP_Post $post): array {
    return array_merge($categories, [
        [
            'slug' => PREFIX,
            'title' => ucwords(PREFIX)
        ],
        [
            'slug' => 'wordpress-default',
            'title' => 'WordPress'
        ]
    ]);
}, 10, 2);

add_action('admin_init', function (): void {
    $tempateCollector = TemplateCollector::getInstance();
    $templates = glob(TemplateCollector::DIR . '/*.php');

    foreach ($templates as $template) {
        $tempateCollector->register($template);
    }
});