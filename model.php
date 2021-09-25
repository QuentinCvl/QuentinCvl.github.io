<?php
function bddConnection() {
  try {
    return $dbh = new \PDO("mysql:host=localhost;dbname=phpBlog", 'quentincvl', 'Mavie190716%');
  }
  catch(Exception $e) {
    die('Erreur : '.$e->getMessage());
  }
}

function getPosts() {
  $dbh = bddConnection();
  return $req = $dbh->query("SELECT * FROM post ORDER BY createdThe DESC");
}

function getPost($postId) {
  $dbh = bddConnection();
  $req = $dbh->query("SELECT * FROM post WHERE id = '$postId'");
  return $post = $req->fetch(PDO::FETCH_ASSOC);
}

// TODO: Create the fonction for comment