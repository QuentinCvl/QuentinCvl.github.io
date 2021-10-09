<?php

class BDD {
  PRIVATE $dbh;
  public function __construct(){
    try {
      $this->dbh = new \PDO("mysql:host=localhost;dbname=phpBlog", 'quentincvl', 'Mavie190716%');
    }
    catch(Exception $e) {
      die('Erreur : '.$e->getMessage());
    }

  }
  public function getConnection(){
    return $this->dbh;
  }

}