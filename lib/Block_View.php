<?php

namespace KWIO\Gutenberg_Blocks;

class Block_View {

    protected $base_class;
    protected $data;

    public function __construct(array $data) {
        $this->base_class = $data['base_class'];
        unset($data['base_class']);

        $this->data = $data;
    }

    public function load(string $view_file): string {
        ob_start();
        extract($this->data, EXTR_SKIP);
        unset($this->data);
        include $view_file;
        return ob_get_clean();
    }

    public function get_post(): WP_Post {
        global $post;
        return $post;
    }

    /**
     * Utility function for BEM style class names.
     */
    public function bem(string $element = '', array $modifiers = []): string {
        $element_class = !empty($element) ? $this->base_class . '__' . $element : $this->base_class;
        $modifiers = array_map(function ($modifier) use ($element_class) {
            return $element_class . '--' . $modifier;
        }, $modifiers);

        return $element_class . (!empty($modifiers) ? ' ' . implode(' ', $modifiers) : '');
    }
}