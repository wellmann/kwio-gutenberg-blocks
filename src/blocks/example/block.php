<?php

namespace KWIO\GutenbergBlocks;

class Example extends BaseBlock
{

    public function __construct(string $blockName)
    {
        parent::__construct($blockName);

        $this->dirPath = dirname(__FILE__);
        $this->addClass('js-%s');
        $this->localizeScript(['example' => 'Example']);
        $this->addScriptData(['tag1' => 'Tag 1', 'tag2' => 'Tag 2']);
    }

    public function render(array $attributes, string $content): string
    {
        parent::render($attributes, $content);

        return $this->setView($this->dirPath . '/view.php');
    }
}