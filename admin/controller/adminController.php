<?php
require 'model/adminModel.php';

function adminHome()
{
  require_once('view/home.php');
}

function login($id, $pswd)
{
  $login = connect($id, $pswd);
  if($login) {
    header("Location: index.php");
  } else {
    header("Location: index.php?page=login&error=1");
  }
  exit();
}

function addPost($title, $img, $content)
{
  $id = setPost($title, $img, $content);
  if($id) {
    header('Location: ../index.php?page=post&id='.$id);
    exit();
  }
}

function updateView($id)
{
  $data = getUpdateData($id);
  if($data) {
    require_once('view/update.php');
  }
}

function updatePost($data, $img = false)
{
  $id = updPost($data, $img);
  if($id) {
    header('Location: ../index.php?page=post&id='.$id);
    exit();
  }
}

function deletePost()
{
  $del = delPost($_GET['id']);
  if($del) {
    header('Location: ../index.php');
    exit();
  } else throw new Exception('deletePost : Le post n\a pas était supprimé');
}

function validComment($commID, $postID) {
  $status = valComment($commID);
  if($status) {
    header('Location: ../index.php?page=post&id='.$postID.'#comments');
    exit();
  }
}

function deleteComment($commID, $postID) {
  $status = delComment($commID);
  if($status) {
    header('Location: ../index.php?page=post&id='.$postID.'#comments');
    exit();
  }
}