<?php
require_once("vendor/autoload.php");
require_once('controller/controller.php');

listPopularPosts();

try {
  if (isset($_GET['page'])) {
    if ($_GET['page'] === "home") {
      listFav();
      listPosts();
    } elseif ($_GET['page'] === "post") {
      post();
    } elseif ($_GET['page'] === "createComment") {
      if (isset($_POST['postID'], $_POST['cName'], $_POST['cMessage'])) {
        addComment($_POST['postID'], $_POST['cName'], $_POST['cMessage']);
      } else {
        throw new Exception('Tous les champs ne sont pas remplis !');
      }
    } elseif ($_GET['page'] === "about") {
      about();
    } elseif ($_GET['page'] === "contact") {
      contact();
    } elseif ($_GET['page'] === "disconnect") {
      session_start();
      session_destroy();
      header('Location: admin/');
      exit();
    } else {
      throw new Exception('La page demandé n\'éxiste pas !');
    }
  } else {
    listFav();
    listPosts();
  }
} catch (Exception $e) {
  $errorMsg = $e->getMessage();
  require_once('view/errorView.php');
}
