<?php
require_once("../vendor/autoload.php");

require_once('controller/adminController.php');

session_start();
try {
  if (!isset($_SESSION['user']['id']) && !isset($_POST['loginBtn'])) {
    require_once('view/login.php');
  } else { //If is connected
    if (isset ($_GET['page'])) {
      if ($_GET['page'] === "login") {
        if (isset($_POST['loginID']) && isset($_POST['loginPSWD'])) {
          login($_POST['loginID'], $_POST['loginPSWD']);
        } else {
          header("Location: index.php?page=login&error=1");
          exit();
        }
      } elseif ($_GET['page'] === "disconnect") {
        session_start();
        session_destroy();
        header('Location: http://127.0.0.1/phpBlog/admin/');
        exit();
      } elseif ($_GET['page'] === "createPost") {
        if (isset($_POST)) {
          if (!empty($_POST['title']) && $_FILES['thumbnail']['size'] > 0 && $_FILES['thumbnail']['error'] == 0 && !empty($_POST['content'])) {
            addPost($_POST['title'], $_FILES['thumbnail'], $_POST['content']);
          } else {
            throw new Exception('createPost : Tous les champs ne sont pas remplis !');
          }
        } else {
          throw new Exception('createPost : Aucune données reçu');
        }
      } elseif ($_GET['page'] === "updateView") {
        if (isset($_GET['id'])) {
          updateView($_GET['id']);
        } else {
          throw new Exception('updateView : l\'ID du post est introuvable.');
        }
      } elseif ($_GET['page'] === "updatePost") {
        if(intval($_SERVER['CONTENT_LENGTH'])>0 && count($_POST)===0) {
          throw new Exception('PHP discarded POST data because of request exceeding post_max_size.');
        }
        if (isset($_POST) && !empty($_POST)) {
          if (isset($_FILES['thumbnail'])) {
            updatePost($_POST, $_FILES['thumbnail']);
          } else {
            updatePost($_POST);
          }
        } else {
          throw new Exception('updatePost : Aucune donnée reçu.');
        }
      } elseif ($_GET['page'] === "deletePost") {
        deletePost();
      } elseif ($_GET['page'] === "adminComment") {
        if(isset($_POST['commID'], $_POST['postID'])) {
          print_r($_POST);
          if(isset($_POST['valid'])) {
            validComment($_POST['commID'], $_POST['postID']);
          } elseif (isset($_POST['delete'])) {
            deleteComment($_POST['commID'], $_POST['postID']);
          }
        } else {
          throw new Exception('adminComment : l\'ID du commentaire est introuvable.');
        }
      }
    } elseif (!isset($_GET['page'])) {
      require_once('view/home.php');
    } else {
      require_once("404.html");
    }
  }
} catch (Exception $e) {
  $errorMsg = $e->getMessage();
  require_once('view/adminErrorView.php');
}
