<?php

namespace KWIO\Gutenberg_Blocks;

trait Block_Utils {

    /**
     * Utility function for BEM style class names in block views.
     */
    public static function bem(array $context, string $element = '', array $modifiers = []): string {
        $base_class = sanitize_html_class($context['base_class']);
        $element_class = !empty($element) ? $base_class . '__' . sanitize_html_class($element) : $base_class;
        $modifiers = array_map(function ($modifier) use ($element_class) {
            return $element_class . '--' . sanitize_html_class($modifier);
        }, $modifiers);

        return $element_class . (!empty($modifiers) ? ' ' . implode(' ', $modifiers) : '');
    }

    /**
     * Use '%s' as a placholder for the base class.
     */
    protected function add_class(string $class): void {
        $class = sprintf($class, $this->base_class);
        $this->tag_attr['class'][] = sanitize_html_class($class);
    }

    protected function localize_script(array $data): void {
        $block_data = Block_Data::get_instance();
        $block_data->set_context('frontend');
        $previous_data = $block_data->get('i18n');
        $data = array_merge($previous_data, $data);
        $block_data->add('i18n', $data);
    }

    protected function add_script_data(array $data, string $context = 'frontend'): void {
        $block_data = Block_Data::get_instance();
        $block_data->set_context($context);
        $block_data->add($this->base_class, $data);
    }
}