<div class="blog-post-item">
	<?
	if ( has_post_thumbnail( get_the_ID() )) {
	?>
	<div class="blog-item-image">
		<img class="img-fluid" src="<?=the_post_thumbnail_url();?>">
	</div>
	<?
	}
	?>
	<div class="blog-item-content">
		<a href="<?the_permalink();?>"><h4><?the_title();?></h4></a>
		<label class="post-date"><?=get_the_date('F j, Y');?></label>
		<div class="post-content">
			<?the_excerpt();?>
			<br/><a href="<?the_permalink();?>" class="post-btn">Read more</a>
		</div>
	</div>
	<hr/>
	<div class="post-tags">
		<?php the_tags( '', '' ); ?>
	</div>
</div>
