<?php
require_once("../vendor/autoload.php");

require_once('controller/adminController.php');

session_start();
if(!isset($_SESSION['id']) && !isset($_POST['loginBtn'])) {
  require_once('view/login.php');
} else { //If is connected
  if (isset ($_GET['page'])) {
    if($_GET['page'] === "login") {
      if(isset($_POST['loginID']) && isset($_POST['loginPSWD'])) {
        login($_POST['loginID'], $_POST['loginPSWD']);
      } else {
        header("Location: index.php?page=login&error=1");
        exit();
      }
    } elseif($_GET['page'] === "disconnect") {
      session_start();
      session_destroy();
      header('Location: http://127.0.0.1/phpBlog/admin/');
      exit();
    } elseif($_GET['page'] === "createPost") {
      if(isset($_POST)) {
        if(!empty($_POST['title']) && $_FILES['thumbnail']['size'] > 0 && $_FILES['thumbnail']['error'] == 0 && !empty($_POST['content'])) {
          addPost($_POST['title'], $_FILES['thumbnail'], $_POST['content']);
        } else {
          die('Erreur : Tous les champs ne sont pas remplis !');
        }
      } else {
        die('Erreur : Aucune données reçu');
      }
    } elseif($_GET['page'] === "updateView") {
      if(isset($_GET['id'])) {
        updateView($_GET['id']);
      } else {
        die('Erreur : l\'ID du post est introuvable.');
      }
    } elseif($_GET['page'] === "updatePost") {
      if(isset($_POST)) {
        if(isset($_FILES['thumbnail'])) {
          updatePost($_POST, $_FILES['thumbnail']);
        } else {
          updatePost($_POST);
        }
      } else {
        die('Erreur : l\'ID du post est introuvable.');
      }
    } elseif($_GET['page'] === "deletePost") {
      deletePost();
    }
  } elseif (!isset($_GET['page'])) {
    adminHome();
  } else {
    require_once("404.html");
  }


}
