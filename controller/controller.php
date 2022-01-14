<?php
require 'model/model.php';

// Each function is a root. She's calling the specific model function and the view

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

function contact() {
  require_once('view/contact.php');
}