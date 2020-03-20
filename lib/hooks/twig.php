<?php

namespace KWIO\Gutenberg_Blocks;

use Timber\Twig_Function;
use Twig\Environment;

add_filter('timber/twig', function (Environment $twig): Environment {
    $twig->addFunction(new Twig_Function('bem', [Block_Utils::class, 'bem'], ['needs_context' => true]));

    return $twig;
});