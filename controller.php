<?php
require 'model.php';

// Each function is a root. She call the specific model fonction and the view

function listPosts() {
  $posts = getPosts();

  require_once('home.php');
}

function post() {
  $post = getPost($_GET['id']);
  // get comment

  //require_once('postView.php');
}