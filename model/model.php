<?php

function getPosts() {
  $BDD = new BDD();
  $dbh = $BDD->getConnection();
  return $req = $dbh->query("SELECT * FROM post ORDER BY createdThe DESC");
}

function getPost($postId) {
  $BDD = new BDD();
  $dbh = $BDD->getConnection();
  $req = $dbh->query("SELECT * FROM post WHERE id = '$postId'");
  return $post = $req->fetch(PDO::FETCH_ASSOC);
}

// TODO: Create the fonction for comment