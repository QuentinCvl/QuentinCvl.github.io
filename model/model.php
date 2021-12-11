<?php

function dbConnect() {
  $BDD = new BDD();
  return $BDD->getConnection();
}

function getPosts() {
  $dbh = dbConnect();
  $req = $dbh->query("SELECT * FROM post ORDER BY createdThe DESC");
  return $data = $req->fetchAll(PDO::FETCH_ASSOC);
}

function getPost($postId) {
  $dbh = dbConnect();
  $req = $dbh->query("SELECT * FROM post WHERE id = '$postId'");
  return $post = $req->fetch(PDO::FETCH_ASSOC);
}

// TODO: Create the fonction for comment