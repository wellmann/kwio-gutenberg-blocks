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
        $this->enqueue('editor');
    }

    public function enqueue_front_end_assets(): void {
        $this->enqueue('blocks');
    }

    /**
     * Enqueue assets based on context and file type.
     */
    private function enqueue(string $filename): void {
        $js_paths = glob(DIR_PATH . "dist/{$filename}.*.js");
        $css_paths = glob(DIR_PATH . "dist/{$filename}.*.css");
        $dependencies = [
            'editor' => [
                'js' => ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
                'css' => ['wp-edit-blocks']
            ],
            'blocks' => ['js' => [], 'css' => []]
        ];
        $handle = PREFIX . '-' . $filename;

        foreach ($js_paths as $js_path) {
            $src = DIR_URL . ltrim($js_path, DIR_PATH);
            wp_enqueue_script($handle, $src, $dependencies[$filename]['js'], null, true);

            if ($filename === 'editor') {
                $block_data = Block_Data::get_instance();
                $block_data->set_context('editor');

                wp_localize_script($handle, 'blockOptions', [
                    'defaultBlocks' => Setup::DEFAULT_BLOCKS,
                    'data' => $block_data->get_all()
                ]);
            }

            if ($filename === 'blocks' && !is_admin()) {
                $block_data = Block_Data::get_instance();
                $block_data->set_context('frontend');

                if (!empty($block_data->get_all())) {
                    wp_localize_script($handle, 'blockData', $block_data->get_all());
                }
            }
        }

        foreach ($css_paths as $css_path) {
            $src = DIR_URL . ltrim($css_path, DIR_PATH);
            wp_enqueue_style($handle, $src, $dependencies[$filename]['css'], null);

            $critical_css_path = DIR_PATH . 'dist/critical.css';
            if ($filename === 'blocks' && !is_admin() && is_readable($critical_css_path)) {
                $critical_css = file_get_contents($critical_css_path);
                $critical_css = str_replace('../../../../', content_url('/'), $critical_css);
                wp_add_inline_style($handle, trim($critical_css));
            }
        }
    }
}