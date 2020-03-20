<?php

namespace KWIO\Gutenberg_Blocks;

class Block_Collector {

    /**
     * Whitelist of default blocks.
     */
    const DEFAULT_BLOCKS = [
        'core/image',
        'core/heading',
        'core/list',
        'core/video',
        'core/table',
        'core/code',
        'core/paragraph',
        'core/column',
        'core/columns',
        'core/group',
        'core/shortcode'
    ];
    const BLOCKS_DIR = DIR_PATH . 'src/blocks';

    private static $instance;

    private $custom_blocks = [];

    public static function get_instance(): Block_Collector {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function get_blocks(): array {

        return $this->custom_blocks;
    }

    public function register_block(string $block): void {
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
        $args = ['render_callback' => [$class_instance, 'render']];

        if (!empty($class_instance->get_attributes())) {
            $args['attributes'] = $class_instance->get_attributes();
        }

        register_block_type($name, $args);

        $this->custom_blocks[] = $name;
    }

    /**
     * Convert kebab case name to capitalized words separated by underscores.
     */
    private function form_class_name(string $name): string {
        $name = ucwords($name, '-');

        return str_replace('-', '_', $name);
    }
}