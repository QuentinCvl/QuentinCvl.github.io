<?php

function dbConnect(): PDO {
  $BDD = new BDD();
  return $BDD->getConnection();
}

function getPosts() {
  $dbh = dbConnect();
  $req = $dbh->query("SELECT * FROM post WHERE fav = 0 ORDER BY createdThe DESC ");
  return $req->fetchAll(PDO::FETCH_ASSOC);
}

function getPost($postId) {
  $dbh = dbConnect();
  $req = $dbh->prepare("SELECT * FROM post WHERE id = :id");
  $req->bindParam(':id', $postId);
  $req->execute();
  return $req->fetch(PDO::FETCH_ASSOC);
}

function getComment($postId) {
  $dbh = dbConnect();
  $req = $dbh->query("SELECT * FROM comment WHERE postID = '$postId'");
  return $req->fetchAll(PDO::FETCH_ASSOC);
}