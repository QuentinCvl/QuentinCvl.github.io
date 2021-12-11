<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
  <meta charset="utf-8">
  <title><?php echo $title ?? 'Eclecticism.' ?></title>
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="../public/css/base.css">
  <link rel="stylesheet" href="../public/css/vendor.css">
  <link rel="stylesheet" href="../public/css/main.css">

  <script src="../public/js/modernizr.js"></script>
  <script src="../public/js/pace.min.js"></script>

  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
  <link rel="icon" href="../favicon.ico" type="image/x-icon">
</head>
<body id="top">

<div id="adminbar">
  <ul class="float-left">
    <li><a href="../index.php">Retour sur le site</a></li>
  </ul>
  <ul class="float-right ab-top-secondary">
    <li id="adminbar-myaccount" class="menupop with-avatar float-right">
      <a class="ab-item" aria-haspopup="true" href="admin/index.php?profile.php">
        <span>Bonjour, <?php echo $_SESSION['username'] ?></span>
        <img src="../public/images/avatars/user-05.jpg"
             class="avatar avatar-26 photo" loading="lazy" alt="">
      </a>
      <div class="ab-sub-wrapper">
        <ul id="adminbar-useractions" class="ab-submenu">
          <li id="adminbar-userinfo">
            <a class="ab-item" tabindex="-1" href="index.php?page=profile">
              <img src="../public/images/avatars/user-05.jpg"
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
<?= $content ?>
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

<script src="../public/js/jquery-3.2.1.min.js"></script>
<script src="../public/js/plugins.js"></script>
<script src="../public/js/main.js"></script>
</body>
</html>