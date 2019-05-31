<?php

use Roots\Sage\Extras;

?>
<footer class="footer">
    <div class="uk-container">
        <div class="uk-padding-large uk-padding-remove-horizontal" uk-grid>
            <div class="uk-width-1-4 first-col">
                <h5>Products</h5>
                <a href="#">Enterprise Resource Planning</a>
                <a href="#">Manufacturing Resource Planning</a>
                <a href="#">Customer Relationship Management</a>
                <a href="#">Human Resource Management System</a>
                <a href="#" class="uk-padding-left">eLeave</a>
                <a href="#" class="uk-padding-left">eClaims</a>
                <a href="#" class="uk-padding-left">eTraining</a>
                <a href="#">Project Management</a>
                <a href="#">Learning Management System</a>
                
            </div>
            <div class="uk-width-expand second-col">
                <div uk-grid>
                    <div class="uk-width-1-5">
                        <h5>Resources</h5>   
                        <a href="#">Customer Stories</a>
                        <a href="#">Case Studies</a>
                        <a href="#">Factsheets</a>
                        <a href="#">Blog</a>
                    </div>
                    <div class="uk-width-1-3">
                        <h5>Partners</h5> 
                        <a href="#">Partners Referral Program</a>
                        <a href="#">Business Development Partners Program</a>
                        <a href="#">Reseller Partners Program</a>
                        <a href="#">Training Partners Program</a>
                        <a href="#">Technology Partners Program</a>
                    </div>
                    <div class="uk-width-1-5">
                        <h5>Company</h5>
                        <a href="#">About Us</a>
                        <a href="#">Awards</a>
                        <a href="#">Events</a>
                        <a href="#">Newsroom</a>
                        <a href="#">Careers</a>
                    </div>
                    <div class="uk-width-1-4 uk-text-right">
                        <img src="<?=get_template_directory_urI();?>/dist/images/deskera.svg" alt="deskera-logo"/>
                    </div>
                </div>
                <div class="second-col-bottom" uk-grid>
                    <div class="uk-width-expand">
                        <h5>Subscribe</h5>
                        <div class="subscribe-form">
                            <div uk-form-custom="target: true" class="s">
                                <input class="uk-input <?=Extras\getLocation();?>-getStarted-input" type="text" placeholder="your email address">
                            </div>
                            <button class="uk-button uk-button-default <?=Extras\getLocation();?>-getStarted-btn">Get Started</button>
                        </div>
                        <div class="social-media">
                            <a href="#">
                                <img src="<?=get_template_directory_urI();?>/dist/images/linkedin.svg" alt"linkedin"/>
                            </a>
                            <a href="#">
                                <img src="<?=get_template_directory_urI();?>/dist/images/fb.svg" alt"fb"/>
                            </a>
                            <a href="#">
                                <img src="<?=get_template_directory_urI();?>/dist/images/twitter.svg" alt"twitter"/>
                            </a>
                            <a href="#">
                                <img src="<?=get_template_directory_urI();?>/dist/images/youtube.svg" alt"youtube"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>