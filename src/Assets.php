<?php

namespace KWIO\Gutenberg_Blocks;

final class Assets {

    /**
     * Hook registrar.
     */
    public static function register(): void {
        $self = new self();

        add_action('enqueue_block_editor_assets', [$self, 'enqueue_editor_assets']);
        add_action('enqueue_block_assets', [$self, 'enqueue_front_end_assets']);
    }

    public function enqueue_editor_assets(): void {
        $this->enqueue(true);
    }

    public function enqueue_front_end_assets(): void {
        $this->enqueue();
    }

    /**
     * Enqueue assets based on context and file type.
     */
    private function enqueue(bool $is_editor = false): void {
        $prefix = $is_editor ? 'editor.': '';
        $js_paths = glob(DIR_PATH . "dist/js/{$prefix}blocks.*.js");
        $css_paths = glob(DIR_PATH . "dist/css/{$prefix}{blocks,styles}.*.css", GLOB_BRACE);
        $dependencies = [
            'editor' => [
                'js' => ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
                'css' => ['wp-edit-blocks']
            ],
            '' => ['js' => [], 'css' => []]
        ];
        $handle = PREFIX . '-blocks';
        $prefix = rtrim($prefix, '.');

        foreach ($js_paths as $js_path) {
            $src = DIR_URL . ltrim($js_path, DIR_PATH);
            wp_enqueue_script($handle, $src, $dependencies[$prefix]['js'], null, true);

            if ($is_editor) {
                wp_localize_script($handle, 'blockOptions', ['defaultBlocks' => Setup::DEFAULT_BLOCKS]);
            } else {
                $block_data = Block_Data::get_instance();
                wp_localize_script($handle, 'blockData', $block_data->get_all());
            }
        }

        foreach ($css_paths as $css_path) {
            $src = DIR_URL . ltrim($css_path, DIR_PATH);
            wp_enqueue_style($handle, $src, $dependencies[$prefix]['css'], null);
        }
    }
}