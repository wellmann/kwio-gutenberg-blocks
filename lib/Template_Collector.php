<?php

namespace KWIO\Gutenberg_Blocks;

class Template_Collector {

    const DIR = DIR_PATH . 'templates';

    private static $instance;

    public static function get_instance(): Template_Collector {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function register(string $template): void {
        if (basename($_SERVER['SCRIPT_FILENAME']) !== 'post-new.php') {
            return;
        }

        $post_type = !empty($_GET['post_type']) ? $_GET['post_type'] : 'post';
        if (!$post_type_obj = get_post_type_object($post_type)) {
            return;
        }

        $template_options = include $template;
        if (!empty($template_options['template'])) {
            $post_type_obj->template = $this->add_namespace_to_block_name($template_options['template']);
        }

        if (!empty($template_options['template_lock'])) {
            $post_type_obj->template_lock = $template_options['template_lock'];
        }
    }

    private function add_namespace_to_block_name(array $template): array {
        return array_map(function (array $block): array {
            $block[0] = strpos($block[0], '/') === false ? PREFIX . '/' . $block[0] : $block[0];

            if (!empty($block[2]) && is_array($block[2])) {
                $block[2] = $this->add_namespace_to_block_name($block[2]);
            }

            return $block;
        }, $template);
    }
}