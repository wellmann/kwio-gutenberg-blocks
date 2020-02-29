<?php

namespace KWIO\Gutenberg_Blocks;

class Block_Data {

    private static $instance;

    private $context;
    private $data = [];

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function set_context(string $context): void {
        $this->context = $context;
    }

    public function add(string $block_name, array $data): void {
        $key = sanitize_title($block_name);
        $this->data[$this->context][$key] = $data;
    }

    public function get(string $block_name): array {
        $key = sanitize_title($block_name);
        if (empty($this->data[$this->context][$key])) {
            return [];
        }

        return $this->data[$this->context][$key];
    }

    public function get_all(): array {
        if (empty($this->data[$this->context])) {
            return [];
        }

        return $this->data[$this->context];
    }
}