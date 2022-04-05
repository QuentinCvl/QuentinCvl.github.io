<?php

Use phpBlog\blog\Post;
Use phpBlog\blog\Comment;
use phpBlog\blog\MailManager;

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
  $getPost = New Post(array('id' => $postId));
  return $getPost->getPost();

}

function getOwner($postId) {
  $getOwner = New Post(array('id' => $postId));
  return $getOwner->getOwner();
}

/**
 * Call the Comment Class and the newComment function
 *
 * @param string $postID ID of the post who receive the new comment
 * @param string $username Username of the user who create the comment
 * @param string $message Comment content
 * @return bool True if successfully created, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function setComment(string $postID, string $username, string $message): bool
{
  $newComment = New Comment(array("postID" => $postID, "username" => $username, "message" => $message));
  return $newComment->newComment();
}

/**
 * Call the Comment Class and the getComments function
 *
 * @param string $postID ID of the post
 * @return array|false Post commentaries array if success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function getComment(string $postID) {
  $getComments = New Comment(array('postID' => $postID));
  return $getComments->getComments();
}

/**
 * Call the Comment Class and the getComments function
 *
 * @param string $name
 * @param string $email
 * @param string $message
 * @return bool Post commentaries array if success, false if not.
 * @throws Exception
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function sendMail(string $name, string $email, string $message): bool
{
  $sendMail = New MailManager($name, $email, $message);
  return $sendMail->sendMail();
}
