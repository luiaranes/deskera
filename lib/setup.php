<?php

namespace Roots\Sage\Setup;

use Roots\Sage\Assets;

/**
 * Theme setup
 */
function setup() {
  // Enable features from Soil when plugin is activated
  // https://roots.io/plugins/soil/
  add_theme_support('soil-clean-up');
  add_theme_support('soil-nav-walker');
  add_theme_support('soil-nice-search');
  add_theme_support('soil-jquery-cdn');
  add_theme_support('soil-relative-urls');

  // Make theme available for translation
  // Community translations can be found at https://github.com/roots/sage-translations
  load_theme_textdomain('sage', get_template_directory() . '/lang');

  // Enable plugins to manage the document title
  // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
  add_theme_support('title-tag');

  // Register wp_nav_menu() menus
  // http://codex.wordpress.org/Function_Reference/register_nav_menus
  register_nav_menus([
    'primary_navigation' => __('Primary Navigation', 'sage')
  ]);

  // Enable post thumbnails
  // http://codex.wordpress.org/Post_Thumbnails
  // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
  // http://codex.wordpress.org/Function_Reference/add_image_size
  add_theme_support('post-thumbnails');

  // Enable post formats
  // http://codex.wordpress.org/Post_Formats
  add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);

  // Enable HTML5 markup support
  // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
  add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

  // Use main stylesheet for visual editor
  // To add custom styles edit /assets/styles/layouts/_tinymce.scss
  add_editor_style(Assets\asset_path('styles/main.css'));
}
add_action('after_setup_theme', __NAMESPACE__ . '\\setup');

/**
 * Register sidebars
 */
function widgets_init() {
  register_sidebar([
    'name'          => __('Primary', 'sage'),
    'id'            => 'sidebar-primary',
    'before_widget' => '<section class="widget %1$s %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h3>',
    'after_title'   => '</h3>'
  ]);

  register_sidebar([
    'name'          => __('Footer', 'sage'),
    'id'            => 'sidebar-footer',
    'before_widget' => '<section class="widget %1$s %2$s">',
    'after_widget'  => '</section>',
    'before_title'  => '<h3>',
    'after_title'   => '</h3>'
  ]);
}
add_action('widgets_init', __NAMESPACE__ . '\\widgets_init');

/**
 * Determine which pages should NOT display the sidebar
 */
function display_sidebar() {
  static $display;

  isset($display) || $display = !in_array(true, [
    // The sidebar will NOT be displayed if ANY of the following return true.
    // @link https://codex.wordpress.org/Conditional_Tags
    is_404(),
    is_front_page(),
    is_page_template('template-custom.php'),
  ]);

  return apply_filters('sage/display_sidebar', $display);
}

/**
 * Theme assets
 */
function assets() {
    wp_enqueue_style('sage/css', Assets\asset_path('css/app.min.css'), false, null);
    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
    wp_enqueue_script('sage/js', Assets\asset_path('js/app.min.js'), ['jquery'], null, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);



/**
 * Load jQuery from jQuery's CDN with a local fallback
 *
 * You can enable/disable this feature in functions.php (or lib/setup.php if you're using Sage):
 * add_theme_support('soil-jquery-cdn');
 */
function register_jquery() {
  $jquery_version = wp_scripts()->registered['jquery']->ver;
  wp_deregister_script('jquery');
  wp_register_script(
    'jquery',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    [],
    null,
    true
  );
  add_filter('wp_resource_hints', function ($urls, $relation_type) {
    if ($relation_type === 'dns-prefetch') {
      $urls[] = 'ajax.googleapis.com';
    }
    return $urls;
  }, 10, 2);
  add_filter('script_loader_src', __NAMESPACE__ . '\\jquery_local_fallback', 10, 2);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\register_jquery', 100);


/**
 * Output the local fallback immediately after jQuery's <script>
 *
 * @link http://wordpress.stackexchange.com/a/12450
 */
function jquery_local_fallback($src, $handle = null) {
  static $add_jquery_fallback = false;
  if ($add_jquery_fallback) {
    echo '<script>(window.jQuery && jQuery.noConflict()) || document.write(\'<script src="' . $add_jquery_fallback .'"><\/script>\')</script>' . "\n";
    $add_jquery_fallback = false;
  }
  if ($handle === 'jquery') {
    $add_jquery_fallback = apply_filters('script_loader_src', get_stylesheet_directory_uri() . '/dist/js/jquery-3.2.1.js', 'jquery-fallback');
  }
  return $src;
}
add_action('wp_head', __NAMESPACE__ . '\\jquery_local_fallback');
