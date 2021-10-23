<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
  <meta charset="utf-8">
  <title>Electicism. - Connexion</title>
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
<section class="s-pageheader full-height">
  <header class="header" style="z-index: 1">
    <div class="header__content row">
      <div class="header__logo">
        <a class="logo" href="../index.php">
          <img src="../public/images/Eclecticism-nobg.png" alt="Homepage">
        </a>
      </div>
    </div>
  </header>
  <div class="loginFormContainer">
    <form name="loginForm" id="loginForm" method="post" action="index.php">
      <fieldset>
        <legend>Connexion Administrateur</legend>

        <div class="form-field">
          <input type="text" class="full-width" id="loginID" name="loginID" placeholder="Identifiant"
          value="<?php if(isset($_POST['loginID'])) echo $_POST['loginID'] ?>" autocomplete="off" required>
        </div>

        <div class="form-field">
          <input type="password" class="full-width" id="loginPSWD" name="loginPSWD" placeholder="Mot de passe"
                 autocomplete="off" required>
        </div>

        <button type="submit" class="submit btn btn--primary full-width">Connexion</button>
      </fieldset>
      <?php
        if(isset($_POST['loginID']) && isset($_POST['loginPSWD'])) {
          $login = new User($_POST['loginID'], $_POST['loginPSWD']);
          $login = $login->login();
          if($login) {
            header("Location: ../index.php");
          } else {
            echo "<p style='color: red'>Connexion échouée</p>";
          }
        }
      ?>
    </form>
  </div>
</section>
