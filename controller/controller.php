<?php
require 'model/model.php';

// Each function is a root. She's calling the specific model function and the view

function listFav() {
  getFav();
}

function listPopularPosts() {
  getPopularPosts();
}

function listPosts() {
  $posts = getPosts();

  require_once('view/home.php');
}

function post() {
  $post = getPost($_GET['id']);
  $comment = getComment($_GET['id']);
  $owner = getOwner($_GET['id']);

  require_once('view/post.php');
}

function addComment($postID, $name, $message) {
  $status = setComment($postID, $name, $message);
  if($status) {
    header('Location: index.php?page=post&id='.$postID.'#comments');
    exit();
  } else {
    throw new Exception('Le commentaire n\'a pas pu être ajouté !');
  }
}

function about() {
  require_once('view/about.php');
}

function contact() {
  require_once('view/contact.php');
}

/**
 * @throws Exception
 */
function sendingMail($name, $email, $message) {
  $status = sendMail($name, $email, $message);
  if($status) {
    header('Location: index.php?page=contact');
    exit();
  } else {
    throw new Exception('Le message n\'a pas pu être envoyé !');
  }
}