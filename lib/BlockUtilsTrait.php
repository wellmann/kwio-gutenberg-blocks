<?php

namespace KWIO\GutenbergBlocks;

trait BlockUtilsTrait
{

    /**
     * Use '%s' as a placholder for the base class.
     */
    protected function addClass(string $class): void
    {
        $class = sprintf($class, $this->baseClass);
        $this->tagAttr['class'][] = sanitize_html_class($class);
    }

    protected function localizeScript(array $data): void
    {
        $blockData = BlockData::getInstance();
        $blockData->setContext('frontend');
        $previousData = $blockData->get('i18n');
        $data = array_merge($previousData, $data);
        $blockData->add('i18n', $data);
    }

    protected function addScriptData(array $data, string $context = 'frontend'): void
    {
        $blockData = BlockData::getInstance();
        $blockData->setContext($context);
        $blockData->add($this->baseClass, $data);
    }
}