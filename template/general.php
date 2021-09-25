<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
  <meta charset="utf-8">
  <title><?= $title ?></title>
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/vendor.css">
  <link rel="stylesheet" href="css/main.css">

  <script src="js/modernizr.js"></script>
  <script src="js/pace.min.js"></script>

  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body id="top">
<section class="s-pageheader s-pageheader--home">
  <header class="header">
    <div class="header__content row">
      <div class="header__logo">
        <a class="logo" href="">
          <img src="images/Eclecticism-nobg.png" alt="Homepage">
        </a>
      </div>
      <ul class="header__social">
        <li>
          <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
        </li>
      </ul>

      <a class="header__search-trigger" href="#"></a>

      <div class="header__search">
        <form role="search" method="get" class="header__search-form" action="#">
          <label>
            <span class="hide-content">Que cherchez vous ?</span>
            <input type="search" class="search-field" placeholder="Espace, musique ..." value="" name="s"
                   title="Que cherchez vous ?" autocomplete="off">
          </label>
          <input type="submit" class="search-submit" value="Search">
        </form>
        <a href="#" title="Close Search" class="header__overlay-close">Close</a>
      </div>


      <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

      <nav class="header__nav-wrap">
        <h2 class="header__nav-heading h6">Navigation</h2>
        <ul class="header__nav">
          <li class="current"><a href="" title="">Accueil</a></li>
          <li class="has-children">
            <a href="#0" title="">Categories</a>
            <ul class="sub-menu">
              <li><a href="index.php?page=category">Espace</a></li>
              <li><a href="index.php?page=category">Musique</a></li>
              <li><a href="index.php?page=category">Santé</a></li>
              <li><a href="index.php?page=category">Voyage</a></li>
            </ul>
          </li>
          <li class="has-children">
            <a href="#0" title="">Blog</a>
            <ul class="sub-menu">
              <li><a href="single-video.html">Video Post</a></li>
              <li><a href="single-audio.html">Audio Post</a></li>
              <li><a href="single-gallery.html">Gallery Post</a></li>
              <li><a href="single-standard.html">Standard Post</a></li>
            </ul>
          </li>
          <li><a href="index.php?page=style-guide" title="">Styles</a></li>
          <li><a href="index.php?page=about" title="">About</a></li>
          <li><a href="index.php?page=contact" title="">Contact</a></li>
          <li><a href="#" title="">Compte</a></li>
        </ul>
        <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Fermer</a>
      </nav>
    </div>
  </header>
  <div class="pageheader-content row">
    <div class="col-full">
      <div class="featured">
        <div class="featured__column featured__column--big">
          <div class="entry" style="background-image:url('images/thumbs/featured/featured-guitarman.jpg');">
            <div class="entry__content">
              <span class="entry__category"><a href="#0">Musique</a></span>
              <h1><a href="#0" title="">Ce que votre préférence musicale dit de vous et de votre personnalité.</a></h1>
              <div class="entry__info">
                <a href="#0" class="entry__profile-pic">
                  <img class="avatar" src="images/avatars/user-03.jpg" alt="">
                </a>
                <ul class="entry__meta">
                  <li><a href="#0">Eclecticism.</a></li>
                  <li>18 Septembre 2021</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="featured__column featured__column--small">
          <div class="entry" style="background-image:url('images/thumbs/featured/featured-watch.jpg');">
            <div class="entry__content">
              <span class="entry__category"><a href="#0">Management</a></span>
              <h1><a href="#0" title="">The Pomodoro Technique Really Works.</a></h1>
              <div class="entry__info">
                <a href="#0" class="entry__profile-pic">
                  <img class="avatar" src="images/avatars/user-03.jpg" alt="">
                </a>
                <ul class="entry__meta">
                  <li><a href="#0">John Doe</a></li>
                  <li>December 27, 2017</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="entry" style="background-image:url('images/thumbs/featured/featured-beetle.jpg');">
            <div class="entry__content">
              <span class="entry__category"><a href="#0">LifeStyle</a></span>
              <h1><a href="#0" title="">Throwback To The Good Old Days.</a></h1>
              <div class="entry__info">
                <a href="#0" class="entry__profile-pic">
                  <img class="avatar" src="images/avatars/user-03.jpg" alt="">
                </a>
                <ul class="entry__meta">
                  <li><a href="#0">John Doe</a></li>
                  <li>December 21, 2017</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  <?= $content ?>
  <footer class="s-footer">
    <div class="s-footer__main">
      <div class="row">
        <div class="col-two md-four mob-full s-footer__sitelinks">
          <h4>Quick Links</h4>
          <ul class="s-footer__linklist">
            <li><a href="#0">Accueil</a></li>
            <li><a href="#0">Blog</a></li>
            <li><a href="#0">Styles</a></li>
            <li><a href="#0">à propos</a></li>
            <li><a href="#0">Contact</a></li>
            <li><a href="#0">Compte</a></li>
            <li><a href="#0">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="col-two md-four mob-full s-footer__archives">
          <h4>Archives</h4>
          <ul class="s-footer__linklist">
            <li><a href="#0">Septembre 2021</a></li>
            <li><a href="#0">Août 2021</a></li>
            <li><a href="#0">Juillet 2021</a></li>
            <li><a href="#0">Juin 2021</a></li>
            <li><a href="#0">Mai 2021</a></li>
            <li><a href="#0">Avril 2021</a></li>
          </ul>
        </div>
        <div class="col-two md-four mob-full s-footer__social">
          <h4>Social</h4>
          <ul class="s-footer__linklist">
            <li><a href="#0">Facebook</a></li>
            <li><a href="#0">Instagram</a></li>
            <li><a href="#0">Twitter</a></li>
            <li><a href="#0">Pinterest</a></li>
            <li><a href="#0">Google+</a></li>
            <li><a href="#0">LinkedIn</a></li>
          </ul>
        </div>
        <div class="col-five md-full end s-footer__subscribe">
          <h4>Our Newsletter</h4>
          <p>Sit vel delectus amet officiis repudiandae est voluptatem. Tempora maxime provident nisi et fuga et enim
            exercitationem ipsam. Culpa consequatur occaecati.</p>
          <div class="subscribe-form">
            <form id="mc-form" class="group" novalidate="true">
              <input type="email" name="EMAIL" class="email" id="mc-email" placeholder="Email Address" required>
              <input type="submit" name="subscribe" value="Send">
              <label for="mc-email" class="subscribe-message"></label>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="s-footer__bottom">
      <div class="row">
        <div class="col-full">
          <div class="s-footer__copyright">
          <span>© Copyright Eclecticism <?php $date = Date('Y');
            echo "$date - " . ($date + 1) ?></span>
            <span>Site Template by <a href="https://colorlib.com/">Colorlib</a></span>
          </div>
          <div class="go-top">
            <a class="smoothscroll" title="Back to Top" href="#top"></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div id="preloader">
    <div id="loader">
      <div class="line-scale">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>

</body>
</html>

