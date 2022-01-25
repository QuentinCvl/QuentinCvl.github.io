<?php

function getFav() {
  $getFav = New Post();
  return $getFav->getFav();
}

function getPopularPosts() {
  $getPopularPosts = New Post();
  return $getPopularPosts->getPopularPosts();
}

function getPosts() {
  $getPosts = New Post();
  return $getPosts->getPosts();
}

function getPost($postId) {
  $getPost = New Post();
  return $getPost->getPost($postId);
}

/**
 * Call the Post Class and the newComment function
 *
 * @param string $postID ID of the post who receive the new comment
 * @param string $name Username of the user who create the comment
 * @param string $message Comment content
 * @return bool True if successfully created, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function setComment(string $postID, string $name, string $message): bool
{
  $newComment = New Post();
  return $newComment->newComment($postID, $name, $message);
}

function getComment($postId) {
  $getComments = New Post();
  return $getComments->getComments($postId);
}

function getOwner($postId) {
  $getOwner = New Post();
  return $getOwner->getOwner($postId);
}