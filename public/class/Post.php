<?php

class Post
{
  private $dbh;

  private $id;
  private $title;
  private $thumbnail;
  private $content;
  private $userID;
  private $createdThe;

  /**
   * User class
   *
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function __construct($values = array())
  {
    $BDD = new BDD();
    $this->dbh = $BDD->getConnection();

    if(!empty($values)) {
      $this->hydrate($values);
    }
  }

  public function hydrate($values) {
    foreach ($values as $attribute => $value) {
      $methode = 'set' . str_replace(' ', '', ucwords(str_replace('_', ' ', $attribute)));

      if(is_callable(array($this, $methode))) {
        $this->$methode($value);
      }
    }
  }
  /* ------ SETTER SECTION ------ */

  /**
   * Set id
   * @param mixed $id
   */
  public function setId($id): void
  {
    $this->id = (int)$id;
  }

  /**
   * Set title
   * @param mixed $title
   */
  public function setTitle($title): void
  {
    $this->title = $title;
  }

  /**
   * Set thumbnail
   * @param mixed $thumbnail
   */
  public function setThumbnail($thumbnail): void
  {
    $this->thumbnail = $thumbnail;
  }

  /**
   * Set content
   * @param mixed $content
   */
  public function setContent($content): void
  {
    $this->content = $content;
  }

  /**
   * Set userID
   * @param mixed $userID
   */
  public function setUserID($userID): void
  {
    $this->userID = $userID;
  }

  /**
   * Set createdThe
   * @param mixed $createdThe
   */
  public function setCreatedThe($createdThe): void
  {
    $this->createdThe = $createdThe;
  }

  /* ------ END OF SETTER SECTION ------ */
  /* ------ GETTER SECTION ------ */

  /**
   * @return mixed
   */
  public function getId()
  {
    return $this->id;
  }
  /* ------ END OF GETTER SECTION ------ */
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
   * @return array|false Return the post data if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getPost(): array
  {
    $req = $this->dbh->prepare("SELECT * FROM post WHERE id = :id");
    $req->bindParam(':id', $this->id);
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
  public function getOwner(): array
  {
    $req = $this->dbh->prepare("SELECT u.username, u.bio FROM user as u, post as p WHERE u.id = p.userID and p.id = :id");
    $req->bindParam(':id', $this->id);
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
  public function newPost()
  {
    // Check if image is valid
    $ext = strtolower(pathinfo($this->thumbnail['name'], PATHINFO_EXTENSION));
    if ($ext != "jpeg" && $ext != "jpg" && $ext != "png" && $ext != "gif") {
      die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
    }
    $thumb = "wait";

    $req = $this->dbh->prepare("INSERT INTO post (title,thumbnail,content, userID, createdThe) 
                        VALUES (:title,:thumb,:content,:userID, NOW())");
    $req->bindParam(':title', $this->title);
    $req->bindParam(':thumb', $thumb);
    $req->bindParam(':content', $this->content);
    $req->bindParam(':userID', $_SESSION['user']['id']);
    $req->execute();
    $lastID = $this->dbh->lastInsertId();

    if(!$lastID) {
      echo "Erreur lors de l'ajout en base de donnée. Contectez l'administrateur ! <br/>";
      die();
    }

    $file = $lastID . '.' . $ext;

    if (!move_uploaded_file($this->thumbnail["tmp_name"], "../public/images/post/" . $file)) {
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
  public function updatePost(): int
  {
    if ($this->thumbnail && $this->thumbnail['size'] > 0 && $this->thumbnail['error'] == 0) {
      // Delete previous img
      $folder = "../public/images/post/";
      $extension = ["jpeg", "jpg", "png", "gif"];
      foreach($extension as $ext) {
        if(file_exists($folder.$this->id.'.'.$ext)) {
          unlink($folder.$this->id.'.'.$ext);
          break;
        }
      }

      $ext = strtolower(pathinfo($this->thumbnail['name'], PATHINFO_EXTENSION));
      if ($ext != "jpeg" && $ext != "jpg" && $ext != "png" && $ext != "gif") {
        die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
      }
      $file = $this->id . '.' . $ext;
      if (!move_uploaded_file($this->thumbnail["tmp_name"], "../public/images/post/" . $file)) {
        echo "Erreur lors de l'ajout de la photo. Contectez l'administrateur !";
        die();
      }
      $req = $this->dbh->prepare("UPDATE post SET title = :title, thumbnail = :thumb, content = :content WHERE id = :id");
      $req->bindParam(':thumb', $file);
    } else {
      $req = $this->dbh->prepare("UPDATE post SET title = :title, content = :content WHERE id = :id");
    }
    $req->bindParam(':title', $this->title);
    $req->bindParam(':content', $this->content);
    $req->bindParam(':id', $this->id);
    return $req->execute() ? (int)$this->id : false;
  }

  /**
   * Delete a specific post and this thumbnail
   *
   * @param $id string ID of the post
   * @return bool Return the true on success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function deletePost(): bool {
    $folder = "../public/images/post/";
    $extension = ["jpeg", "jpg", "png", "gif"];
    foreach($extension as $ext) {
      if(file_exists($folder.$this->id.'.'.$ext)) {
        unlink($folder.$this->id.'.'.$ext);
        break;
      }
    }
    $req = $this->dbh->prepare("DELETE FROM post WHERE id = :id");
    $req->bindParam(':id', $this->id);
    $req->execute();
    return (bool)$req->rowCount();
  }
}