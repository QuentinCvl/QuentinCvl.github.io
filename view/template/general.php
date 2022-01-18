<?php
if(!isset($_SESSION)) session_start();
?>
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
<?php if (isset($_SESSION['user']) && !empty($_SESSION['user'])) : ?>
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
          <span>Bonjour, <?php echo $_SESSION['user']['username'] ?></span>
          <img src="public/images/avatars/user-05.jpg"
               class="avatar avatar-26 photo" loading="lazy" alt="">
        </a>
        <div class="ab-sub-wrapper">
          <ul id="adminbar-useractions" class="ab-submenu">
            <li id="adminbar-userinfo">
              <a class="ab-item" tabindex="-1" href="admin/index.php">
                <img src="public/images/avatars/user-05.jpg"
                     class="avatar avatar-64 photo" loading="lazy" alt="">
                <span class="display-name"><?php echo $_SESSION['user']['username'] ?></span>
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
      <?php if(!isset($_SESSION['user'])) : ?>
      <a style="float: right" href="admin/">a</a>
      <?php endif; ?>
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

      <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

      <nav class="header__nav-wrap">
        <h2 class="header__nav-heading h6">Navigation</h2>
        <ul class="header__nav">
          <li <?php if (!isset($_GET['page']) || $_GET['page'] === 'home') echo 'class="current"' ?>>
            <a href="index.php" title="">Accueil</a>
          </li>
          <!--<li class="has-children">
            <a href="#0" title="">Categories</a>
            <ul class="sub-menu">
              <li><a href="index.php?page=category">Espace</a></li>
              <li><a href="index.php?page=category">Musique</a></li>
              <li><a href="index.php?page=category">Santé</a></li>
              <li><a href="index.php?page=category">Voyage</a></li>
            </ul>
          </li>-->
          <li><a href="index.php?page=about" title="">à propos</a></li>
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
                <!--<span class="entry__category"><a href="#0">Musique</a></span>-->
                <h1>
                  <a href="index.php?page=post&id=1" title="">Ce que votre préférence musicale dit de vous et de votre personnalité.</a>
                </h1>
                <div class="entry__info">
                  <a href="index.php?page=post&id=1" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
                  </a>
                  <ul class="entry__meta">
                    <li><a href="index.php?page=post&id=1">Eclecticism.</a></li>
                    <li>17 Octobre 2021</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="featured__column featured__column--small">
            <div class="entry" style="background-image:url('public/images/thumbs/featured/featured-watch.jpg');">
              <div class="entry__content">
                <h1><a href="index.php?page=post&id=2" title="">Montre connecté, les nouveautés</a></h1>
                <div class="entry__info">
                  <a href="index.php?page=post&id=2" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
                  </a>
                  <ul class="entry__meta">
                    <li><a href="index.php?page=post&id=2">Eclecticism.</a></li>
                    <li>17 Octobre 2021</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="entry" style="background-image:url('public/images/thumbs/featured/featured-beetle.jpg');">
              <div class="entry__content">
                <h1><a href="index.php?page=post&id=3" title="">Retour au bon vieux temps</a></h1>
                <div class="entry__info">
                  <a href="index.php?page=post&id=3" class="entry__profile-pic">
                    <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
                  </a>
                  <ul class="entry__meta">
                    <li><a href="index.php?page=post&id=3">Eclecticism.</a></li>
                    <li>19 Octobre 2021</li>
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
      <h3>Publications populaire</h3>
      <div class="block-1-2 block-m-full popular__posts">
        <?php
        setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
        foreach ($_SESSION['pop'] as $pop) : ?>
          <article class="col-block popular__post">
            <a href="index.php?page=post&id=<?php echo $pop['id'] ?>" class="popular__thumb">
              <img src="public/images/post/<?php echo $pop['thumbnail'] ?>" alt="">
            </a>
            <h5><a href="index.php?page=post&id=<?php echo $pop['id'] ?>"><?php echo $pop['title'] ?></a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>Par</span> <a href="#0"> <?php echo $pop['username'] ?></a></span>
              <span class="popular__date"><span>le</span>
                <time datetime="<?php echo $pop['createdThe'] ?>"><?php echo strftime("%d %B %Y", strtotime($pop['createdThe']));?></time></span>
            </section>
          </article>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="col-four md-six tab-full about">
      <h3>Notre Philosophie</h3>
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

</section>
<footer class="s-footer">
  <div class="s-footer__main">
    <div class="row">
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

