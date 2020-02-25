<?php

namespace KWIO\Gutenberg_Blocks;

use WP_Post;
use Timber\Twig_Function;
use Twig\Environment;

final class Setup {

    /**
     * Whitelist of default blocks.
     */
    const DEFAULT_BLOCKS = [
        'core/image',
        'core/heading',
        'core/list',
        'core/file',
        'core/video',
        'core/table',
        'core/code',
        'core/wysiwyg',
        'core/columns',
        'core/button',
        'core/spacer',
        'core/nextpage',
        'core/more',
        'core/shortcode'
    ];
    const BLOCKS_DIR = DIR_PATH . 'src/blocks';

    private static $custom_blocks = [];

    /**
     * Hook registrar.
     */
    public static function register(): void {
        $self = new self();

        add_filter('allowed_block_types', [$self, 'allowed_blocks'], 10, 2);
        add_filter('block_categories', [$self, 'add_categories'], 10, 2);
        add_action('init', [$self, 'collect_blocks']);
        add_filter('timber/twig', [$self, 'add_to_twig']);
    }

    public function allowed_blocks(bool $allowed_blocks, WP_Post $post): array {
        $allowed_blocks = self::DEFAULT_BLOCKS;

        return array_merge($allowed_blocks, self::$custom_blocks);
    }

    public function add_categories(array $categories, WP_Post $post): array {

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
    }

    public function collect_blocks(): void {
        $blocks = array_diff(scandir(self::BLOCKS_DIR), ['.', '..']);

        foreach ($blocks as $block) {
            $block = sanitize_title($block);
            $this->register_block($block);
        }
    }

    public function add_to_twig(Environment $twig): Environment {
        $twig->addFunction(new Twig_Function('bem', [Block_Utils::class, 'bem'], ['needs_context' => true]));

        return $twig;
    }

    private function register_block(string $block): void {
        $class_name = 'Base_Block';

        // Check if block has a dedicated PHP class.
        $class_path = self::BLOCKS_DIR . "/{$block}/block.php";
        if (file_exists($class_path)) {
            require_once $class_path;
            $class_name = $this->form_class_name($block);
        }

        $class_name = __NAMESPACE__ . '\\' . $class_name;
        $class_instance = new $class_name($block);
        $name = PREFIX . '/' . $block;

        register_block_type($name, [
            'render_callback' => [$class_instance, 'render']
        ]);

        self::$custom_blocks[] = $name;
    }

    /**
     * Convert kebab case name to capitalized words separated by underscores.
     */
    private function form_class_name(string $name): string {
        $name = ucwords($name, '-');

        return str_replace('-', '_', $name);
    }
}