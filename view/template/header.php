<section class="s-pageheader <?php if (!isset($_GET['page']) || $_GET['page'] === "home") echo "s-pageheader--home" ?>">
  <header class="header">
    <div class="header__content row">
      <div class="header__logo">
        <a class="logo" href="index.php">
          <img src="public/images/Eclecticism-nobg.png" alt="Homepage">
        </a>
      </div>
      <?php if(!isset($_SESSION['user'])) : ?>
        <a style="float: right" href="admin/">.</a>
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

      <a class="header__toggle-menu" href="" title="Menu"><span>Menu</span></a>

      <nav class="header__nav-wrap">
        <h2 class="header__nav-heading h6">Navigation</h2>
        <ul class="header__nav">
          <li <?php if (!isset($_GET['page']) || $_GET['page'] === 'home') echo 'class="current"' ?>>
            <a href="index.php" title="">Accueil</a>
          </li>
          <li><a href="index.php?page=about" title="">à propos</a></li>
          <li><a href="index.php?page=contact" title="">Contact</a></li>
        </ul>
        <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Fermer</a>
      </nav>
    </div>
  </header>
  <?php if (!isset($_GET['page']) || $_GET['page'] === "home") {
    require_once 'view/template/homeHeaderBanner.php';
  } ?>
</section>
