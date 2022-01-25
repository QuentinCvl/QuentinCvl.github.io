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
<?php if (isset($_SESSION['user']) && !empty($_SESSION['user'])) {
  require_once('view/template/adminBar.php');
} ?>
<?php require_once('view/template/header.php') ?>
<?= $content ?>
<?php require_once('view/template/extraFooter.php') ?>
<?php require_once('view/template/footer.php') ?>

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

