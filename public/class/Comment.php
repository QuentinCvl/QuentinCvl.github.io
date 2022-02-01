<?php

class Comment
{
  private $dbh;

  private int $id;
  private int $postID;
  private string $username;
  private string $message;
  private $publishedThe;
  private bool $validated;

  /**
   * Comment class
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
   * @param int $id
   */
  public function setId(int $id): void
  {
    $this->id = $id;
  }

  /**
   * Set postID
   * @param mixed $postID
   */
  public function setPostID($postID): void
  {
    $this->postID = $postID;
  }

  /**
   * Set username
   * @param mixed $username
   */
  public function setUsername($username): void
  {
    $this->username = $username;
  }

  /**
   * Set message
   * @param mixed $message
   */
  public function setMessage($message): void
  {
    $this->message = $message;
  }

  /**
   * Set publishedThe
   * @param mixed $publishedThe
   */
  public function setPublishedThe($publishedThe): void
  {
    $this->publishedThe = $publishedThe;
  }

  /**
   * Set validated
   * @param bool $validated
   */
  public function setValidated(bool $validated): void
  {
    $this->validated = $validated;
  }
  /* ------ END OF SETTER SECTION ------ */
  /* ------ GETTER SECTION ------ */

  /**
   * Get id
   * @return mixed
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * Get postID
   * @return int
   */
  public function getPostID(): int
  {
    return (int)$this->postID;
  }

  /**
   * Get username
   * @return string
   */
  public function getUsername(): string
  {
    return $this->username;
  }

  /**
   * Get message
   * @return string
   */
  public function getMessage(): string
  {
    return $this->message;
  }

  /**
   * @return mixed
   */
  public function getPublishedThe()
  {
    return $this->publishedThe;
  }

  /**
   * Get validated
   * @return bool
   */
  public function getValidated(): bool
  {
    return $this->validated;
  }

  /* ------ END OF GETTER SECTION ------ */

  /**
   * Get all commentaries of a specific post
   *
   * @return array|false Return the post commentaries if success, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function getComments(): array
  {
    $req = $this->dbh->prepare("SELECT * FROM comment WHERE postID = :postID");
    $req->bindParam(':postID', $this->postID);
    $req->execute();

    return $req->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
   * Create Comment function
   *
   * @param string $postID
   * @param string $username
   * @param string $message
   * @return bool Return true if successfully created, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function newComment(): bool
  {
    $validated = isset($_SESSION['user']) ? 1 : 0;
    $this->setValidated($validated);
    $req = $this->dbh->prepare("INSERT INTO comment (postID,username,message, publishedThe, validated) 
                        VALUES (:postID,:username,:message, NOW(), :validated)");
    $req->bindParam(':postID', $this->postID);
    $req->bindParam(':username', $this->username);
    $req->bindParam(':message', $this->message);
    $req->bindParam(':validated', $validated);
    return $req->execute();
  }

  /**
   * Valid a specific commentary
   *
   * @param $id string ID of the commentary
   * @return bool Return the true if successfully validated, false if not.
   * @author Quentin Cuvelier <quentincuvelier@laposte.net>
   */
  public function validateComment(): bool {
    $req = $this->dbh->prepare("UPDATE comment SET validated = 1 WHERE id = :id");
    $req->bindParam(':id', $this->id);
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
  public function deleteComment(): bool {
    $req = $this->dbh->prepare("DELETE FROM comment WHERE id = :id");
    $req->bindParam(':id', $this->id);
    $req->execute();
    return (bool)$req->rowCount();
  }
}