<?php/* while (have_posts()) : the_post(); ?>
  <article <?php post_class(); ?>>
    <header>
      <h1 class="entry-title"><?php the_title(); ?></h1>
      <?php get_template_part('templates/entry-meta'); ?>
    </header>
    <div class="entry-content">
      <?php the_content(); ?>
    </div>
    <footer>
      <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
    </footer>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php endwhile; */?>
<div class="post-breadcrumbs">
<?php custom_breadcrumbs(); ?>
</div>
<?php while (have_posts()) : the_post(); ?>
<div class="single-post-container">
	<h2><?the_title();?></h2>
	<label class="post-date"><?=get_the_date('F j, Y');?></label>
	<div class="post-content">
		<?the_content();?>
		
		<div class="wh-related-posts">
		<?
		$_postID = get_the_id();
		$_IDsArr = get_post_meta($_postID, '_related_post_val', true);
		
		if(!empty($_IDsArr)){
			if($_IDsArr[0] != 'no-post'){			
				$_argss = array(
					'post_type' => 'post',
					'p' => $_IDsArr[0],
					'post_status ' => 'publish',
				);

				$_relatedPost = new WP_Query( $_argss );
				
				if ( $_relatedPost->have_posts() ) :
				?>
					<? while ( $_relatedPost->have_posts() ) : $_relatedPost->the_post(); ?>
					<div class="post-div">
						<a href="<?=get_permalink( get_the_ID() );?>"><img class="img-fluid" src="<?=get_the_post_thumbnail_url();?>" alt=""></a>
						<div class="content">
							<div class="title"><a href="<?=get_permalink( get_the_ID() );?>"><?the_title();?></a></div>
							<div class="excerpt"><?=get_the_excerpt();?></div>
							<a class="read-more btn btn-act" href="<?=get_permalink( get_the_ID() );?>"><?= __('Read More', 'your-text-domain');?></a>
						</div>
					</div>
					<? 
					endwhile;
					wp_reset_postdata();
				endif;
			}
			if($_IDsArr[1] != 'no-post'){			
				$_argss = array(
					'post_type' => 'post',
					'p' => $_IDsArr[1],
					'post_status ' => 'publish',
				);

				$_relatedPost = new WP_Query( $_argss );
				
				if ( $_relatedPost->have_posts() ) :
				?>
					<? while ( $_relatedPost->have_posts() ) : $_relatedPost->the_post(); ?>
					<div class="post-div">
						<a href="<?=get_permalink( get_the_ID() );?>"><img class="img-fluid" src="<?=get_the_post_thumbnail_url();?>" alt=""></a>
						<div class="content">
							<div class="title"><a href="<?=get_permalink( get_the_ID() );?>"><?the_title();?></a></div>
							<div class="excerpt"><?=get_the_excerpt();?></div>
							<a class="read-more btn btn-act" href="<?=get_permalink( get_the_ID() );?>"><?= __('Read More', 'your-text-domain');?></a>
						</div>
					</div>
					<? 
					endwhile;
					wp_reset_postdata();
				endif;
			}
		}
		?>
		</div>
		<hr/>
		<div class="post-tags">
			<?php the_tags( '', '' ); ?>
		</div>
	</div>
</div>
<?php endwhile; ?>