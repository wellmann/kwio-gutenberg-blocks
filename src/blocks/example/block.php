<?php

namespace KWIO\Gutenberg_Blocks;

class Example extends Base_Block {

    public function __construct(string $block_name) {
        parent::__construct($block_name);

        $this->dir_path = dirname(__FILE__);
        $this->add_class('js-%s');
        $this->localize_script(['example' => 'Example']);
        $this->add_script_data(['tag1' => 'Tag 1', 'tag2' => 'Tag 2']);
    }

    public function render(array $attributes, string $content): string {
        parent::render($attributes, $content);

        $content = '123';

        return $this->set_view($this->dir_path . '/view.twig', compact('content'));
    }
}