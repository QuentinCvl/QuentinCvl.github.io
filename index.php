<?php
include_once("vendor/autoload.php");

require_once('controller.php');

if (isset ($_GET['page']) && file_exists($_GET['page'] . '.php')) {
  if($_GET['page'] === "home") {
    listPosts();
  }
} elseif (isset ($_GET['page']) && file_exists($_GET['page'] . '.html')) {
  require_once($_GET['page'] . '.html');
} elseif (!isset($_GET['page'])) {
  listPosts();
} else {
  require_once("404.html");
}

