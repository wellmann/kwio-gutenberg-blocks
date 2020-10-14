<?php

namespace KWIO\GutenbergBlocks;

class BaseBlock
{
    use BlockUtilsTrait;

    protected $dirPath;
    protected $baseClass;

    private $tagAttr;
    private $data;
    private $hideMobile;
    private $hideDesktop;

    public function __construct(string $blockName)
    {
        $this->dirPath = DIR_PATH . '/src/blocks/' . $blockName;
        $this->baseClass = 'block-' . $blockName;
        $this->tagAttr['class'] = ['block', $this->baseClass];
        $this->data['baseClass'] = $this->baseClass;
    }

    public function getAttributes(): array
    {
        $attributesJson = $this->dirPath . '/attributes.json';
        if (!is_readable($attributesJson)) {
            return [];
        }

        $attributes = file_get_contents($attributesJson);
        if (!json_decode($attributes)) {
            return [];
        }

        return json_decode($attributes, true);
    }

    public function render(array $attributes, string $content): string
    {
        $this->data = array_merge($this->data, $attributes, compact('content'));
        $this->hideMobile = $this->extractAttr('hideMobile');
        $this->hideDesktop = $this->extractAttr('hideDesktop');

        $this->extractAttr('className', 'class');
        $this->extractAttr('align', 'class');
        $this->extractAttr('anchor', 'id');

        return $this->setView($this->dirPath . '/view.php');
    }

    /**
     * Rendered HTML output of the block.
     */
    protected function setView(string $file, array $data = []): string
    {
        if (!file_exists($file)) {
            return '';
        }

        if (wp_is_mobile() && $this->hideMobile) {
            return '';
        }

        if (!wp_is_mobile() && $this->hideDesktop) {
            return '';
        }

        $this->tagAttr['class'] = convert_to_bem($this->tagAttr['class'], $this->baseClass);
        $tagAttrString = to_tag_attr_string($this->tagAttr);
        $data = array_merge($this->data, $data);
        $blockView = new BlockView($data);
        $blockHtml = $blockView->load($file);

        return "<div{$tagAttrString}>{$blockHtml}</div>";
    }

    /**
     * Extract key–value pair from data passed to the blocks view
     * and optionally rename it for use as HTML attribute.
     *
     * @param string $attr Attribute name to extract.
     * @param string $newAttr New attribute name to extract value into.
     *
     * @return null|string Attribute value.
     */
    private function extractAttr(string $attr, string $newAttr = ''): ?string
    {
        if (!array_key_exists($attr, $this->data)) {
            return null;
        }

        $value = $this->data[$attr];
        $this->tagAttr[$newAttr][] = $value;
        unset($this->data[$attr]);

        return $value;
    }
}