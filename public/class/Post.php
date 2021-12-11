<?php

class Post
{
  private $dbh;

  /**
   * User class
   *
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function __construct()
  {
    $BDD = new BDD();
    $this->dbh = $BDD->getConnection();
  }

  /**
   * Create Post function
   *
   * @return bool
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function newPost($title, $img, $content)
  {
    // Check if image is valid
    $ext = strtolower(pathinfo($img['name'], PATHINFO_EXTENSION));
    if ($ext != "jpeg" && $ext != "jpg" && $ext != "png" && $ext != "gif") {
      die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
    }
    $thumb = "wait";


    $req = $this->dbh->prepare("INSERT INTO post (title,thumbnail,content, userID, createdThe) 
                        VALUES (:title,:thumb,:content,:userID, NOW())");
    $req->bindParam(':title', $title);
    $req->bindParam(':thumb', $thumb);
    $req->bindParam(':content', $content);
    $req->bindParam(':userID', $_SESSION['id']);
    $req->execute();
    $lastID = $this->dbh->lastInsertId();

    $file = $lastID . '.' . $ext;

    if (!move_uploaded_file($img["tmp_name"], "../public/images/post/" . $file)) {
      echo "Erreur lors de l'ajout de la photo. Contectez l'administrateur !";
      die();
    }

    $req = $this->dbh->prepare("UPDATE post SET thumbnail = :file WHERE id = :id");
    $req->bindParam(':file', $file);
    $req->bindParam(':id', $lastID);
    $req->execute();
    return $lastID;
  }

  public function getData($id)
  {
    $req = $this->dbh->prepare("SELECT title, thumbnail, content FROM post WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
  }

  public function updatePost($data, $img = false): int
  {
    if ($img && $img['size'] > 0 && $img['error'] == 0) {
      $ext = strtolower(pathinfo($img['name'], PATHINFO_EXTENSION));
      if ($ext != "jpeg" && $ext != "jpg" && $ext != "png" && $ext != "gif") {
        die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
      }
      $file = $data['id'] . '.' . $ext;
      if (!move_uploaded_file($img["tmp_name"], "../public/images/post/" . $file)) {
        echo "Erreur lors de l'ajout de la photo. Contectez l'administrateur !";
        die();
      }
      $req = $this->dbh->prepare("UPDATE post SET title = :title, thumbnail = :thumb, content = :content WHERE id = :id");
      $req->bindParam(':thumb', $file);
    } else {
      $req = $this->dbh->prepare("UPDATE post SET title = :title, content = :content WHERE id = :id");
    }
    $req->bindParam(':title', $data['title']);
    $req->bindParam(':content', $data['content']);
    $req->bindParam(':id', $data['id']);
    $req->execute();
    return $data['id'];
  }

  public function deletePost($id) : bool {
    $req = $this->dbh->prepare("DELETE FROM post WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return $req->rowCount() ? true : false;
  }
}