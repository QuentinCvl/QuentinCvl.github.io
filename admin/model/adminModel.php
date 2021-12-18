<?php

/**
 * Call the Post Class and the login function
 *
 * @param $id string User username (ID)
 * @param $pswd string User password
 * @return bool Return true if logged, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function connect(string $id, string $pswd) : bool {
  $login = new User($id, $pswd);
  return $login->login();
}

/**
 * Call the Post Class and the newPost function
 *
 * @param $title String Tile of the new publication
 * @param $img Array Thumbnail image
 * @param $content String Content
 * @return string|void New post ID if successfully created, void if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function setPost(string $title, array $img, string $content) {
  $newPost = New Post();
  return $newPost->newPost($title, $img, $content);
}

/**
 * Call the Post Class and the getData function
 *
 * @param $id String ID of the post
 * @return array|false Post data if success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function getUpdateData(string $id): array {
  $getData = New Post();
  return $getData->getData($id);
}

/**
 * Call the Post Class and the updatePost function
 *
 * @param $data array New data of the post
 * @param $img array [Optional] New thumbnail of the post
 * @return int|false Post id if success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function updPost(array $data, $img = false): int {
  $updatePost = New Post();
  return $updatePost->updatePost($data, $img);
}

/**
 * Call the Post Class and the deletePost function
 *
 * @param $postId string ID of the specific post
 * @return bool True on success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function delPost(string $postId): bool{
  $deletePost = New Post();
  return $deletePost->deletePost($postId);
}