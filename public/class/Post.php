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
   * @param $title String Tile of the new publication
   * @param $img Array Thumbnail image
   * @param $content String Content
   * @return string|void Return the new post id if success, void if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function newPost(string $title, array $img, string $content)
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

  /**
   * Get data of a specific post
   *
   * @param $id String ID of the post
   * @return array|false Return the post data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getData(string $id): array
  {
    $req = $this->dbh->prepare("SELECT title, thumbnail, content FROM post WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
  }

  /**
   * Update a specific post
   *
   * @param $data array Data of the post (id, title, content)
   * @param $img array [Optional] The new thumbnail, if it has been changed.
   * @return int|false Return the post id if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function updatePost(array $data, $img = false): int
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
    return $req->execute() ? (int)$data['id'] : false;
  }

  /**
   * Delete a specific post and this thumbnail
   *
   * @param $id string ID of the post
   * @return bool Return the true on success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function deletePost(string $id): bool {
    $folder = "../public/images/post/";
    $extension = ["jpeg", "jpg", "png", "gif"];
    foreach($extension as $ext) {
      if(file_exists($folder.$id.'.'.$ext)) {
        unlink($folder.$id.'.'.$ext);
        break;
      }
    }
    $req = $this->dbh->prepare("DELETE FROM post WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return (bool)$req->rowCount();
  }

  /**
   * Create Comment function
   *
   * @param string $postID
   * @param string $name
   * @param string $message
   * @return bool Return true if successfully created, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function newComment(string $postID, string $name, string $message): bool
  {
    $validate = isset($_SESSION) ? 1 : 0;
    $req = $this->dbh->prepare("INSERT INTO comment (postID,username,message, publishedThe, validated) 
                        VALUES (:postID,:username,:message, NOW(), :validated)");
    $req->bindParam(':postID', $postID);
    $req->bindParam(':username', $name);
    $req->bindParam(':message', $message);
    $req->bindParam(':validated', $validate);
    return $req->execute();
  }

  /**
   * Valid a specific commentary
   *
   * @param $id string ID of the commentary
   * @return bool Return the true if successfully validated, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function validateComment(string $id): bool {
    $req = $this->dbh->prepare("UPDATE comment SET validated = 1 WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return (bool)$req->rowCount();
  }

  /**
   * Delete a specific commentary
   *
   * @param $id string ID of the commentary
   * @return bool Return the true if successfully deleted, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function deleteComment(string $id): bool {
    $req = $this->dbh->prepare("DELETE FROM comment WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return (bool)$req->rowCount();
  }
}