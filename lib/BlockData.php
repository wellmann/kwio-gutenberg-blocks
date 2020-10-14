<?php

namespace KWIO\GutenbergBlocks;

class BlockData
{

    private static $instance;

    private $context;
    private $data = [];

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function setContext(string $context): void
    {
        $this->context = $context;
    }

    public function add(string $blockName, array $data): void
    {
        $key = sanitize_title($blockName);
        $this->data[$this->context][$key] = $data;
    }

    public function get(string $blockName): array
    {
        $key = sanitize_title($blockName);
        if (empty($this->data[$this->context][$key])) {
            return [];
        }

        return $this->data[$this->context][$key];
    }

    public function getAll(): array
    {
        if (empty($this->data[$this->context])) {
            return [];
        }

        return $this->data[$this->context];
    }
}