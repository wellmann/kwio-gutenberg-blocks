<?php

namespace KWIO\GutenbergBlocks;

use KWIO\GutenbergBlocksFramework\BaseBlock;

class Example extends BaseBlock
{
    public function render(array $attributes, string $content): string
    {
        parent::render($attributes, $content);

        $this->addClass('js-%s');
        $this->addData('render-count', $this->getRenderCount());

        $this->addJs('editor.js');

        return $this->setView($this->dirPath . 'view.php');
    }
}