<?php

namespace KWIO\Gutenberg_Blocks;

class Block_Data {

    private static $instance;

    private $data;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function add(string $block_name, array $data): void {
        $key = sanitize_title($block_name);
        $this->data[$key] = $data;
    }

    public function get(string $block_name): array {
        $key = sanitize_title($block_name);
        if (empty($this->data[$key])) {
            return [];
        }

        return $this->data[$key];
    }

    public function get_all(): array {
        return $this->data;
    }
}