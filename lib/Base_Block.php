<?php

namespace KWIO\Gutenberg_Blocks;

use Timber\Post;
use Timber\Timber;

class Base_Block {

    use Block_Utils;

    protected $dir_path;
    protected $base_class;

    private $tag_attr;
    private $data;
    private $hide_mobile;
    private $hide_desktop;

    public function __construct(string $block_name) {
        $this->dir_path = DIR_PATH . '/src/blocks/' . $block_name;
        $this->base_class = 'block-' . $block_name;
        $this->tag_attr['class'] = ['block', $this->base_class];
        $this->data['base_class'] = $this->base_class;
    }

    public function get_attributes(): array {
        $attributes_json = $this->dir_path . '/attributes.json';
        if (!is_readable($attributes_json)) {
            return [];
        }

        $attributes = file_get_contents($attributes_json);
        if (!json_decode($attributes)) {
            return [];
        }

        return json_decode($attributes, true);
    }

    public function render(array $attributes, string $content): string {
        $this->data = array_merge($this->data, $attributes, compact('content'));
        $this->hide_mobile = $this->extract_attr('hideMobile');
        $this->hide_desktop = $this->extract_attr('hideDesktop');

        $this->extract_attr('className', 'class');
        $this->extract_attr('align', 'class');
        $this->extract_attr('anchor', 'id');

        return $this->set_view($this->dir_path . '/view.twig');
    }

    /**
     * Rendered HTML output of the block.
     */
    protected function set_view(string $file, array $data = []): string {
        if (!file_exists($file)) {
            return '';
        }

        if (wp_is_mobile() && $this->hide_mobile) {
            return '';
        }

        if (!wp_is_mobile() && $this->hide_desktop) {
            return '';
        }

        $this->tag_attr['class'] = $this->convert_to_bem($this->tag_attr['class']);
        $tag_attr_string = $this->to_tag_attr_string($this->tag_attr);
        $data = array_merge($this->data, $data);
        $data['post'] = new Post();
        $block_html = Timber::compile($file, $data);

        return "<div{$tag_attr_string}>{$block_html}</div>";
    }

    /**
     * Extract key–value pair from data passed to the blocks view
     * and optionally rename it for use as HTML attribute.
     *
     * @param string $attr Attribute name to extract.
     * @param string $new_attr New attribute name to extract value into.
     *
     * @return null|string Attribute value.
     */
    private function extract_attr(string $attr, string $new_attr = ''): ?string {
        if (!array_key_exists($attr, $this->data)) {
            return null;
        }

        $value = $this->data[$attr];
        $this->tag_attr[$new_attr][] = $value;
        unset($this->data[$attr]);

        return $value;
    }

    /**
     * Workaround until https://github.com/WordPress/gutenberg/issues/11763 is fixed.
     */
    private function convert_to_bem(array $classnames): array {
        return array_map(function (string $classname): string {
            if (strpos($classname, 'is-style-') !== false) {
                return str_replace('is-style-', $this->base_class . '--', $classname);
            }

            if (strpos($classname, 'has-background-color-') !== false) {
                return str_replace('has-background-color-', 'background-', $classname);
            }

            if (strpos($classname, 'has-text-color-') !== false) {
                return str_replace('has-text-color-', 'color-', $classname);
            }

            return $classname;
        }, $classnames);
    }

    /**
     * Convert key-value pairs to string of HTML attributes.
     */
    private function to_tag_attr_string(array $array): string {
        $tag_attr_string = '';
        foreach ($array as $key => $value) {
            if (empty($key)) {
                continue;
            }

            if (is_array($value)) {
                $value = implode(' ', $value);
            }

            $value = esc_attr($value);
            $tag_attr_string .= " {$key}=\"{$value}\"";
        }

        return $tag_attr_string;
    }
}