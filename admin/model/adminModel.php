<?php


/**
 * Call the Post Class and the login function
 *
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 * @return bool
 */
function connect($id, $pswd) : bool {
  $login = new User($id, $pswd);
  return $login->login();
}

/* Create a post */
function setPost($title, $img, $content) {
  $newpost = New Post();
  return $newpost->newPost($title, $img, $content);
}
/*
 * Get data from specific post for re-fill the update form
 * @param $id
*/
function getUpdateData($id)
{
  $getData = New Post();
  return $getData->getData($id);
}

// update a post
function updPost($data, $img = false) : int{
  $updatePost = New Post();
  return $updatePost->updatePost($data, $img);
}
// Delete a post
function delPost($postId) : bool{
  $deletePost = New Post();
  return $deletePost->deletePost($postId);
}