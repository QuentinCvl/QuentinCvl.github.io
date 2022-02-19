<?php

namespace phpBlog\blog;

class User extends BDD
{
  public string $username;
  public string $pswd;
  /**
   * User class
   *
   * @param $username String Username of the user
   * @param $pswd String Password of the user
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function __construct(string $username, string $pswd)
  {
    $this->username = $username;
    $this->pswd = $pswd;
  }

  /**
   * Login function
   * Check in BDD if user exist and if password match
   *
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   * @return bool
   */
  public function login() : bool {
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $stmt = $dbh->prepare("SELECT * FROM user WHERE username = ?");
    $stmt->execute(array($this->username));
    $status = (bool)$stmt->rowCount();
    if($status) {
      $row = $stmt->fetch(\PDO::FETCH_ASSOC);
      $pass_verif = password_verify($this->pswd, $row["password"]);
      if($pass_verif) {
        session_start();
        $_SESSION['user']["id"] = (int)$row["id"];
        $_SESSION['user']["email"] = $row['email'];
        $_SESSION['user']["username"] = $row['username'];
      } else {
        return false;
      }
    }
    return $status;
  }
}