<?php
require_once("vendor/autoload.php");

require_once('controller/controller.php');

if (isset ($_GET['page'])) {
  if($_GET['page'] === "home") {
    listPosts();
  } elseif($_GET['page'] === "post") {
    post();
  } elseif($_GET['page'] === "contact") {
    contact();
  } elseif($_GET['page'] === "disconnect") {
    session_start();
    session_destroy();
    header('Location: admin/');
  }
} elseif (isset ($_GET['page']) && file_exists($_GET['page'] . '.html')) {
  require_once($_GET['page'] . '.html');
} elseif (!isset($_GET['page'])) {
  listPosts();
} else {
  require_once("404.html");
}

