<?php

class BDD {
  PRIVATE $dbh;
  public function __construct(){
    try {
      $this->dbh = new \PDO("mysql:host=localhost;dbname=phpBlog", 'quentincvl', 'Mavie190716%');
      // Disable emulation of prepared statements
      $this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      // Enable error exception catching
      $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(Exception $e) {
      die('Erreur : '.$e->getMessage());
    }

  }
  public function getConnection(){
    return $this->dbh;
  }

}