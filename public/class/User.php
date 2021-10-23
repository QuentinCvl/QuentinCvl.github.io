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

  public function register($firstname, $lastname, $profession, $grade, $createdby)
  {
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $test = $dbh->prepare('SELECT username FROM users WHERE username = ?');
    $test->execute(array($this->username));
    $nbr = $test->rowCount();

    if ($nbr != 0) { // Si l'username est deja utilisé, le compteur va passé a 1
      echo '<div class="alert alert-danger" role="alert">' .
        "Nom d'utilisateur déja utilisé, il doit être unique" .
        '</div>';
    } else {
      $pswd = password_hash($this->pswd, PASSWORD_DEFAULT);
      $BDD = new BDD();
      $dbh = $BDD->getConnection();
      $sth = $dbh->prepare('INSERT INTO users(username, pswd, firstname, lastname, profession, grade, created_by) 
            VALUES (:username, :pswd, :firstname, :lastname, :profession, :grade, :createdby)');
      $sth->bindParam(':username', $this->username);
      $sth->bindParam(':pswd', $pswd);
      $sth->bindParam(':firstname', $firstname);
      $sth->bindParam(':lastname', $lastname);
      $sth->bindParam(':profession', $profession);
      $sth->bindParam(':grade', $grade);
      $sth->bindParam(':createdby', $createdby);
      $sth->execute();

      echo '<div class="alert alert-success float" role="alert">' .
        "Le compte a bien était créé." .
        '</div>';
    }
  }


  public function adminUpdate($firstname, $lastname, $profession, $grade, $createdby) {
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $stmt = $dbh->prepare('UPDATE `users` SET pswd = :pswd, firstname = :firstname,  lastname = :lastname,
                   profession = :profession, grade = :grade, created_by = :createdby WHERE username = :username');
    $pswd = password_hash($this->pswd, PASSWORD_DEFAULT);
    $stmt->execute(array(':pswd' => $pswd, ':firstname' => $firstname, ':lastname' => $lastname, ':profession' => $profession,
      ':grade' => $grade, ':createdby' => $createdby, ':username' => $this->username));

    echo '<div class="alert alert-success float" role="alert">' .
      "Le compte a bien était mis à jour." .
      '</div>';
  }
  public function updateWithoutMdp($firstname, $lastname, $profession, $grade, $createdby){
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $stmt = $dbh->prepare('UPDATE `users` SET firstname = :firstname,  lastname = :lastname,
                   profession = :profession, grade = :grade, created_by = :createdby WHERE username = :username');
    $stmt->execute(array(':firstname' => $firstname, ':lastname' => $lastname, ':profession' => $profession,
      ':grade' => $grade, ':createdby' => $createdby, ':username' => $this->username));

    echo '<div class="alert alert-success float" role="alert">' .
      "Le compte a bien était mis à jour." .
      '</div>';
  }
  public function deleteUser() {
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $req = $dbh->query("DELETE FROM users WHERE username ='$this->username'");
    echo '<div class="alert alert-success float" role="alert">' .
      "Le compte a bien était supprimé." .
      '</div>';
    return $req;
  }

  public function profilUpdate($firstname, $lastname){
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $stmt = $dbh->prepare('UPDATE `users` SET firstname = :firstname,  lastname = :lastname 
                                        WHERE username = :username');
    $stmt->execute(array(':firstname' => $firstname, ':lastname' => $lastname, ':username' => $this->username));

    $_SESSION["firstname"] = $firstname;
    $_SESSION["lastname"] = $lastname;

    echo '<div class="alert alert-success float" role="alert">' .
      "Vos informations ont bien était changé, rechargez la page." .
      '</div>';
  }

  public function profilUpdatePswd($pswd){
    $BDD = new BDD();
    $dbh = $BDD->getConnection();
    $pswd = password_hash($pswd, PASSWORD_DEFAULT);
    $stmt = $dbh->prepare('UPDATE `users` SET pswd = :pswd WHERE username = :username');
    $stmt->execute(array(':pswd' => $pswd, ':username' => $this->username));

    $_SESSION["pswd"] = $pswd;

    echo '<div class="alert alert-success float" role="alert">' .
      "Vos informations ont bien était changé, rechargez la page." .
      '</div>';
  }
}