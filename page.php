<?php while (have_posts()) : the_post(); ?>
  <?php if(is_page('product')): ?>
    <?php get_template_part('templates/content', 'product'); ?>
  <?php elseif(is_page('blog')): ?>
    <?php get_template_part('templates/content', 'blog'); ?>
  <?php else: ?>
    <?php get_template_part('templates/content', 'page'); ?>
  <?php endif; ?> 
<?php endwhile; ?>
