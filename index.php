<?php
include_once("vendor/autoload.php");


include_once("header.php");

if (isset ($_GET['page']) && file_exists($_GET['page'] . '.php')) {
    require_once($_GET['page'] . '.php');
} elseif (isset ($_GET['page']) && file_exists($_GET['page'] . '.html')) {
  require_once($_GET['page'] . '.html');
} elseif (!isset($_GET['page'])) {
    require_once("home.php");
} else {
    require_once("404.html");
}

include_once("footer.php");
