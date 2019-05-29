<div class="whablog-sidebar">
	<?php
	// Promo banner 1
	$promo_banner_1 = ot_get_option( 'promo_banner_1' );
	$promo_url_1 = ot_get_option( 'promo_url_1' );
	// Promo banner 2
	$promo_banner_2 = ot_get_option( 'promo_banner_2' );
	$promo_url_2 = ot_get_option( 'promo_url_2' );
	// Promo banner 3
	$promo_banner_3 = ot_get_option( 'promo_banner_3' );
	$promo_url_3 = ot_get_option( 'promo_url_3' );

	if ($blockip == "") { //START NSW CHECK GEOIP
	?>
		<?if ( $promo_banner_1 && $promo_url_1 ) : ?>
		<div class="sidebar-banner">
			<a href="<?php echo $promo_url_1; ?>">
				<img src="<?php echo $promo_banner_1; ?>" alt="">
			</a>
		</div>
		<?endif;?>
		
		<?if ( $promo_banner_2 && $promo_url_2 ) : ?>
		<div class="sidebar-banner">
			<a href="<?php echo $promo_url_2; ?>">
				<img src="<?php echo $promo_banner_2; ?>" alt="">
			</a>
		</div>
		<?endif;?>
		
		<?if ( $promo_banner_3 && $promo_url_3 ) : ?>
		<div class="sidebar-banner">
			<a href="<?php echo $promo_url_3; ?>">
				<img src="<?php echo $promo_banner_3; ?>" alt="">
			</a>
		</div>
		<?endif;?>
	<?
	}
	?>
	
	<!-- SIDEBAR LATEST ARTICLE !-->
    <?
	$the_query = new WP_Query( 'posts_per_page=10' );
	if ( $the_query->have_posts() ) {
	?>
	<div class="latest-article">
		<h5>Latest Articles</h5>
		<?
		while ($the_query -> have_posts()) : $the_query -> the_post();
			echo '<a href="'.get_the_permalink().'">'.get_the_title().'</a>';
		endwhile;
		wp_reset_postdata();
		?>
	</div>
	<?
	}
	?>
	<!-- //SIDEBAR LATEST ARTICLE !-->
	
	<div class="wh-twitter">
		<h5>William Hill on Twitter</h5>
		<!-- <?php echo $blog_brand; ?> -->
		<?php if ( $blog_brand == "tw_" ) { ?>
		<a class="twitter-timeline" href="https://twitter.com/TW_Bet" data-widget-id="616382401812430848" data-chrome="noborders nofooter noscrollbar noheader" data-link-color="#0188c2" height="300" data-tweet-limit="4" data-show-replies="false">Tweets by @TW_Bet</a>
		<?php } else { ?>
		<a class="twitter-timeline"  href="https://twitter.com/WillHillWolf" data-chrome="noborders nofooter noscrollbar noheader" data-link-color="#0188c2" height="300" data-tweet-limit="4" data-show-replies="false">Tweets by @WillHillWolf</a>
		<?php } ?>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>
</div>