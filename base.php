<?php

use Roots\Sage\Setup;
use Roots\Sage\Wrapper;
use Roots\Sage\Extras;

?>

<!doctype html>
<html <?php language_attributes(); ?>>
	<?php get_template_part('templates/head'); ?>
	<body <?php body_class(); ?>>
		<?php
		do_action('get_header');
		get_template_part('templates/header');
		?>
		<section id="content" role="main" class="content-wrapper">
			<?php include Wrapper\template_path(); ?>
		</section>
		<?php
		do_action('get_footer');
		get_template_part('templates/footer');
		wp_footer();
		?>
	</div>
  </body>
</html>
