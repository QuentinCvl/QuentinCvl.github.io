<?php

class User {
  public $username;
  public $pswd;

  public function __construct($username, $pswd)
  {
    $this->username = $username;
    $this->pswd = $pswd;
  }

  public function login() {
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $stmt = $dbh->prepare("SELECT * FROM user WHERE username = ?");
    $stmt->execute(array($this->username));
    $status =  $stmt->rowCount();
    if($status) {
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      /*$pass_verif = password_verify($this->pswd, $row["password"]);
      if($pass_verif) {
        $_SESSION["id"] = (int)$row["id"];
        $_SESSION["email"] = $row['email'];
        $_SESSION["username"] = $row['username'];
      }*/
      if($this->pswd === $row["password"]) {
        session_start();
        $_SESSION["id"] = (int)$row["id"];
        $_SESSION["email"] = $row['email'];
        $_SESSION["username"] = $row['username'];
      } else {
        return false;
      }
    }
    return $status;
  }
}