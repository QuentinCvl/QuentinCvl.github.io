<?php
session_start();
if(isset($_SESSION) && !empty($_SESSION)) echo "Une session est en cours";
echo '<pre>';
var_dump($_SESSION);
echo '</pre>';
