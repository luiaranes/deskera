<nav class="uk-navbar-container uk-navbar-transparent deskera-header uk-margin-large-bottom" uk-navbar>

    <div class="uk-navbar-left">
		<div class="uk-navbar-brand">
			<a href="/" id="logo" class="uk-navbar-item uk-logo">
				<img src="<?=get_template_directory_urI();?>/dist/images/deskera.svg" alt="deskera-logo"/>
			</a>
		</div>
        <ul class="uk-navbar-nav">
			<li><a href="#">Desktop for Mobile</a></li>
            <li>
                <a href="#">Products<span uk-icon="chevron-down"></span></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Product 1</a></li>
                        <li><a href="#">Product 2</a></li>
                        <li><a href="#">Product 3</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="#">Company<span uk-icon="chevron-down"></span></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Product 1</a></li>
                        <li><a href="#">Product 2</a></li>
                        <li><a href="#">Product 3</a></li>
                    </ul>
                </div>
			</li>
            <li>
                <a href="#">Resources<span uk-icon="chevron-down"></span></a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Product 1</a></li>
                        <li><a href="#">Product 2</a></li>
                        <li><a href="#">Product 3</a></li>
                    </ul>
                </div>
			</li>
			<li><a href="#">Contact Us</a></li>
        </ul>

    </div>

    <div class="uk-navbar-right">

        <a href="#" class="get-started-cta">Get Started</a>

    </div>

</nav>