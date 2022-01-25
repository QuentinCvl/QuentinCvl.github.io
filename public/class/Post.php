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
   * Get all no fav post
   *
   * @return array|false Return posts data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getFav(): array
  {

    $req = $this->dbh->query("SELECT p.id, p.title, p.createdThe, p.thumbnail, u.username 
                FROM post as p, user as u 
                WHERE fav = 1 AND p.userID = u.id
                ORDER BY createdThe LIMIT 3");
    $fav = $req->fetchAll(PDO::FETCH_ASSOC);

    if(!isset($_SESSION)) session_start();
    $_SESSION['fav'] = $fav;

    return $fav;
  }

  /**
   * Get the 6 most popular posts
   *
   * @return array|false Return the post data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getPopularPosts(): array
  {
    $req = $this->dbh->query("SELECT postID, count(*) as count FROM comment WHERE validated = 1 GROUP BY postID");
    $comments = $req->fetchAll(PDO::FETCH_ASSOC);

    $columns = array_column($comments, 'count');
    array_multisort($columns, SORT_DESC, $comments);
    if(count($comments) > 6) {
      $comments = array_slice($comments, 0, 6);
    }

    $listPop = array();
    foreach ($comments as $com) {
      $query = "SELECT p.id, p.title, p.thumbnail, p.createdThe, u.username 
                FROM post as p, user as u 
                WHERE p.id = :id and p.userID = u.id";
      $req = $this->dbh->prepare($query);
      $req->bindParam(':id', $com['postID']);
      $req->execute();
      $listPop[] = $req->fetch(PDO::FETCH_ASSOC);
    }

    session_start();
    $_SESSION['pop'] = $listPop;
    return $listPop;
  }

  /**
   * Get all no fav post
   *
   * @return array|false Return posts data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getPosts(): array
  {
    $req = $this->dbh->query("SELECT * FROM post WHERE fav = 0 ORDER BY createdThe DESC ");
    return $req->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
   * Get data from specific post
   *
   * @param string $id ID of the specific post
   * @return array|false Return the post data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getPost(string  $id): array
  {
    $req = $this->dbh->prepare("SELECT * FROM post WHERE id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
  }

  /**
   * Get Owner data from specific post
   *
   * @param string $id ID of the specific post
   * @return array|false Return the owner data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getOwner(string  $id): array
  {
    $req = $this->dbh->prepare("SELECT u.username, u.bio FROM user as u, post as p WHERE u.id = p.userID and p.id = :id");
    $req->bindParam(':id', $id);
    $req->execute();
    return $req->fetch(PDO::FETCH_ASSOC);
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
   * Get all commentaries of a specific post
   *
   * @return array|false Return the post commentaries if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getComments($postId): array
  {
    $req = $this->dbh->query("SELECT * FROM comment WHERE postID = '$postId'");
    return $req->fetchAll(PDO::FETCH_ASSOC);
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
    $validate = isset($_SESSION['user']) ? 1 : 0;
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