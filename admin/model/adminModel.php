<?php

Use phpBlog\blog\User;
Use phpBlog\blog\Post;
Use phpBlog\blog\Comment;

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
  $newPost = New Post(array('title' => $title, 'thumbnail' => $img, 'content' => $content));
  return $newPost->newPost();
}

/**
 * Call the Post Class and the getUpdateData function
 *
 * @param $id String ID of the post
 * @return array|false Post data if success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function getUpdateData(string $id): array {
  $getData = New Post(array('id' => $id));
  return $getData->getPost();
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
  $updatePost = New Post(array('id' => $data['id'], 'title' => $data['title'], 'content' => $data['content'],
    'thumbnail' => $img));
  return $updatePost->updatePost();
}

/**
 * Call the Post Class and the deletePost function
 *
 * @param $postId string ID of the specific post
 * @return bool True on success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function delPost(string $postId): bool{
  $deletePost = New Post(array('id' => $postId));
  return $deletePost->deletePost();
}

/**
 * Call the Post Class and the validateComment function
 *
 * @param $commID string ID of the specific comment
 * @return bool True on success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function valComment(string $commID): bool{
  $valComment = New Comment(array('id' => $commID));
  return $valComment->validateComment();
}

/**
 * Call the Post Class and the deleteComment function
 *
 * @param $commID string ID of the specific comment
 * @return bool True on success, false if not.
 * @author Quentin Cuvelier <quentincuvelier@laposte.net>
 */
function delComment(string $commID): bool{
  $deleteComment = New Comment(array('id' => $commID));
  return $deleteComment->deleteComment();
}