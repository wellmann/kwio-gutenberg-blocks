<?php

namespace KWIO\GutenbergBlocks;

class BlockCollector
{

    /**
     * Whitelist of default blocks.
     */
    public const DEFAULT_BLOCKS = [
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
    public const DIR = DIR_PATH . 'src/blocks';

    private static $instance;

    private $customBlocks = [];

    public static function getInstance(): BlockCollector
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getAll(): array
    {
        return $this->customBlocks;
    }

    public function register(string $block): void
    {
        $className = 'BaseBlock';

        // Check if block has a dedicated PHP class.
        $classPath = self::DIR . "/{$block}/block.php";
        if (file_exists($classPath)) {
            require_once $classPath;
            $className = str_replace('-', '', ucwords($block, '-'));
        }

        $className = __NAMESPACE__ . '\\' . $className;
        $classInstance = new $className($block);
        $name = PREFIX . '/' . $block;
        $args = ['render_callback' => [$classInstance, 'render']];

        if (!empty($classInstance->getAttributes())) {
            $args['attributes'] = $classInstance->getAttributes();
        }

        register_block_type($name, $args);

        $this->customBlocks[] = $name;
    }
}