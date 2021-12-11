<?php

function dbConnect() {
  $BDD = new BDD();
  return $BDD->getConnection();
}

function login($id, $pswd) {
  $login = new User($id, $pswd);
  return $login->login();
}
/* Create a post */
function setPost($title, $img, $content)
{
  /* Check if image is valid */
  $ext = strtolower(pathinfo($img['name'],PATHINFO_EXTENSION));
  if($ext != "jpeg" && $ext != "jpg" &&  $ext != "png" && $ext != "gif") {
    die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
  }
  $thumb = "wait";
  $dbh = dbConnect();
  $req = $dbh->prepare("INSERT INTO post (title,thumbnail,content, userID, createdThe) 
                        VALUES (?,?,?,?, NOW())");
  $req->execute(array($title, $thumb, $content, $_SESSION['id']));
  $lastID = $dbh->lastInsertId();

  $file = $lastID.'.'. $ext;

  if(!move_uploaded_file($img["tmp_name"], "../public/images/post/".$file)) {
    echo "Erreur lors de l'ajout de la photo. Contectez l'administrateur !";
    die();
  }

  $req = $dbh->query("UPDATE post SET thumbnail = '$file' WHERE id = '$lastID'");
  return $lastID;
}

function getUpdateData($id)
{
  $dbh = dbConnect();
  $req = $dbh->query("SELECT title, thumbnail, content FROM post WHERE id = '$id'");
  return $req->fetch(PDO::FETCH_ASSOC);
}

/* update a post */
function updPost($data, $img = false) {
  $dbh = dbConnect();
  if($img && $img['size'] > 0 && $img['error'] == 0) {
    $ext = strtolower(pathinfo($img['name'],PATHINFO_EXTENSION));
    if($ext != "jpeg" && $ext != "jpg" &&  $ext != "png" && $ext != "gif") {
      die('Erreur : L\'image n\'est pas dans le bon format. Format accepté : JPEG, JPG, PNG, GIF');
    }
    $file = $data['id'].'.'. $ext;
    if(!move_uploaded_file($img["tmp_name"], "../public/images/post/".$file)) {
      echo "Erreur lors de l'ajout de la photo. Contectez l'administrateur !";
      die();
    }
    $req = $dbh->prepare("UPDATE post SET title = :title, thumbnail = :thumb, content = :content WHERE id = :id");
    $req->execute(array(":title" => $data['title'], ":thumb" => $file, ":content" => $data['content'],
      ":id" => $data['id']));
  } else {
    $req = $dbh->prepare("UPDATE post SET title = :title, content = :content WHERE id = :id");
    $req->execute(array(":title" => $data['title'], ":content" => $data['content'], ":id" => $data['id']));
  }
  return $data['id'];
}
/* Delete a post */
function delPost($postId) {
  $dbh = dbConnect();
  $req = $dbh->prepare("DELETE FROM post WHERE id ='$postId'");
  $req->execute();

  return $req->rowCount();
}