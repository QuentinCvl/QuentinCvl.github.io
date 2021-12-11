<?php session_start() ?>
<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
  <meta charset="utf-8">
  <title><?php echo $title ?? 'Eclecticism.' ?></title>
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="public/css/base.css">
  <link rel="stylesheet" href="public/css/vendor.css">
  <link rel="stylesheet" href="public/css/main.css">

  <script src="public/js/modernizr.js"></script>
  <script src="public/js/pace.min.js"></script>

  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body id="top">
<?php if (isset($_SESSION) && !empty($_SESSION)) : ?>
  <div id="adminbar">
    <ul class="float-left">
      <li id="adminbar-panel">
        <a class="ab-item" aria-haspopup="true" href="admin/index.php">
          <i class="fa fa-desktop" aria-hidden="true"></i><span>Tableau de bord</span>
        </a>
      </li>
      <?php if (isset($_GET['page']) && $_GET['page'] === "post") : ?>
        <li id="adminbar-panel">
          <a class="ab-item" aria-haspopup="true" href="admin/index.php?page=updateView&id=<?php echo $post['id'] ?>">
            <i class="fa fa-edit" aria-hidden="true"></i><span>Modifier le post</span>
          </a>
        </li>
        <li id="adminbar-panel">
          <a class="ab-item" aria-haspopup="true" href="admin/index.php?page=deletePost&id=<?php echo $post['id'] ?>">
            <i class="fa fa-trash" aria-hidden="true"></i><span>Supprimer le post</span>
          </a>
        </li>
      <?php endif; ?>
    </ul>
    <ul class="float-right ab-top-secondary">
      <li id="adminbar-myaccount" class="menupop with-avatar float-right">
        <a class="ab-item" aria-haspopup="true" href="#">
          <span>Bonjour, <?php echo $_SESSION['username'] ?></span>
          <img src="public/images/avatars/user-05.jpg"
               class="avatar avatar-26 photo" loading="lazy" alt="">
        </a>
        <div class="ab-sub-wrapper">
          <ul id="adminbar-useractions" class="ab-submenu">
            <li id="adminbar-userinfo">
              <a class="ab-item" tabindex="-1" href="admin/index.php">
                <img src="public/images/avatars/user-05.jpg"
                     class="avatar avatar-64 photo" loading="lazy" alt="">
                <span class="display-name"><?php echo $_SESSION['username'] ?></span>
              </a>
            </li>
            <li id="wp-admin-bar-edit-profile">
              <a class="ab-item" href="index.php?page=profile">Modifier le profil</a>
            </li>
            <li id="wp-admin-bar-logout">
              <a class="ab-item" href="index.php?page=disconnect">Se déconnecter</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
<?php endif; ?>
<section class="s-pageheader <?php if (!isset($_GET['page']) || $_GET['page'] === "home") echo "s-pageheader--home" ?>">
  <header class="header">
    <div class="header__content row">
      <div class="header__logo">
        <a class="logo" href="index.php">
          <img src="public/images/Eclecticism-nobg.png" alt="Homepage">
        </a>
      </div>
      <a style="float: right" href="admin/">a</a>
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

      <!--<a class="header__search-trigger" href="#"></a>

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
      </div>-->


      <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

      <nav class="header__nav-wrap">
        <h2 class="header__nav-heading h6">Navigation</h2>
        <ul class="header__nav">
          <li <?php if (!isset($_GET['page']) || $_GET['page'] === 'home') echo 'class="current"' ?>>
            <a href="index.php" title="">Accueil</a>
          </li>
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
        </ul>
        <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Fermer</a>
      </nav>
    </div>
  </header>
  <?php if (!isset($_GET['page']) || $_GET['page'] === "home") : ?>
    <div class="pageheader-content row">
      <div class="col-full">
        <div class="featured">
          <div class="featured__column featured__column--big">
            <div class="entry" style="background-image:url('public/images/thumbs/featured/featured-guitarman.jpg');">
              <div class="entry__content">
                <span class="entry__category"><a href="#0">Musique</a></span>
                <h1><a href="#0" title="">Ce que votre préférence musicale dit de vous et de votre personnalité.</a>
                </h1>
                <div class="entry__info">
                  <a href="#0" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
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
            <div class="entry" style="background-image:url('public/images/thumbs/featured/featured-watch.jpg');">
              <div class="entry__content">
                <span class="entry__category"><a href="#0">Management</a></span>
                <h1><a href="#0" title="">The Pomodoro Technique Really Works.</a></h1>
                <div class="entry__info">
                  <a href="#0" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
                  </a>
                  <ul class="entry__meta">
                    <li><a href="#0">John Doe</a></li>
                    <li>December 27, 2017</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="entry" style="background-image:url('public/images/thumbs/featured/featured-beetle.jpg');">
              <div class="entry__content">
                <span class="entry__category"><a href="#0">LifeStyle</a></span>
                <h1><a href="#0" title="">Throwback To The Good Old Days.</a></h1>
                <div class="entry__info">
                  <a href="#0" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
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
  <?php endif; ?>
</section>
<?= $content ?>
<section class="s-extra">
  <div class="row top">
    <div class="col-eight md-six tab-full popular">
      <h3>Popular Posts</h3>
      <div class="block-1-2 block-m-full popular__posts">
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/wheel-150.jpg" alt="">
          </a>
          <h5><a href="#0">Visiting Theme Parks Improves Your Health.</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-19">Dec 19, 2017</time></span>
          </section>
        </article>
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/shutterbug-150.jpg" alt="">
          </a>
          <h5><a href="#0">Key Benefits Of Family Photography.</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-18">Dec 18, 2017</time></span>
          </section>
        </article>
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/cookies-150.jpg" alt="">
          </a>
          <h5><a href="#0">Absolutely No Sugar Oatmeal Cookies.</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-16">Dec 16, 2017</time></span>
          </section>
        </article>
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/beetle-150.jpg" alt="">
          </a>
          <h5><a href="#0">Throwback To The Good Old Days.</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-16">Dec 16, 2017</time></span>
          </section>
        </article>
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/tulips-150.jpg" alt="">
          </a>
          <h5><a href="#0">10 Interesting Facts About Caffeine.</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-14">Dec 14, 2017</time></span>
          </section>
        </article>
        <article class="col-block popular__post">
          <a href="#0" class="popular__thumb">
            <img src="public/images/thumbs/small/salad-150.jpg" alt="">
          </a>
          <h5><a href="#0">Healthy Mediterranean Salad Recipes</a></h5>
          <section class="popular__meta">
            <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
            <span class="popular__date"><span>on</span> <time datetime="2017-12-12">Dec 12, 2017</time></span>
          </section>
        </article>
      </div>
    </div>

    <div class="col-four md-six tab-full about">
      <h3>About Philosophy</h3>
      <p>
        Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id
        orci porta dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut
        lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
      </p>
      <ul class="about__social">
        <li>
          <a href="#0"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
        </li>
      </ul>
    </div>
  </div>

  <div class="row bottom tags-wrap">
    <div class="col-full tags">
      <h3>Tags</h3>
      <div class="tagcloud">
        <a href="#0">Lieux</a>
        <a href="#0">Planete</a>
        <a href="#0">étoile</a>
        <a href="#0">Capitale</a>
        <a href="#0">Montagne</a>
        <a href="#0">Rock</a>
        <a href="#0">Alimentation</a>
        <a href="#0">Sport</a>
        <a href="#0">Covid-19</a>
        <a href="#0">Festival</a>
        <a href="#0">Grèce</a>
        <a href="#0">Satelite</a>
        <a href="#0">Concert</a>
      </div>
    </div>
  </div>
</section>
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
        <h4>Notre Newsletter</h4>
        <p>Sit vel delectus amet officiis repudiandae est voluptatem. Tempora maxime provident nisi et fuga et enim
          exercitationem ipsam. Culpa consequatur occaecati.</p>
        <div class="subscribe-form">
          <form id="mc-form" class="group" novalidate="true">
            <input type="email" name="EMAIL" class="email" id="mc-email" placeholder="Address email" required>
            <input type="submit" name="subscribe" value="Envoyer">
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

<script src="public/js/jquery-3.2.1.min.js"></script>
<script src="public/js/plugins.js"></script>
<script src="public/js/main.js"></script>
<?php if (isset($_GET['page']) && $_GET['page'] === "contact") : ?>
  <script src="https://maps.googleapis.com/maps/api/js"></script>
<?php endif; ?>
</body>
</html>

