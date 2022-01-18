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