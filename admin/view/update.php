<?php
$title = "Admin Panel";
ob_start();
?>
<section class="s-pageheader" style="min-height: 110px">
  <header class="header" style="z-index: 1">
    <div class="header__content row">
      <div class="header__logo">
        <a class="logo" href="../index.php">
          <img src="../public/images/Eclecticism-nobg.png" alt="Homepage">
        </a>
      </div>
    </div>
  </header>
</section>
<div>
  <form id="updatePostForm" class="adminForm" name="updatePost" method="post" action="index.php?page=updatePost"
        enctype="multipart/form-data">
    <h2>Panel Administrateur<br>Modification du post n° <?php echo $_GET['id'] ?></h2>

    <input type="hidden" name="id" value="<?php echo $_GET['id'] ?>">

    <div class="form-field">
      <label for="title">Titre</label>
      <input type="text" class="full-width" id="title" name="title" autocomplete="off"
             value="<?php echo $data['title'] ?>" required>
    </div>

    <div class="form-field">
      <h4>Image</h4>
      <div class="adminFormImage">
        <img src="../public/images/post/<?php echo $data['thumbnail'] ?>">
      </div>
      <label for="thumbnail">Modifier l'image</label><br>
      <input type="file" class="full-width" id="thumbnail" name="thumbnail"
             accept=".jpg, .jpeg, .png, .gif">
      <p class="annotation">Laissez vide si vous ne voulez pas remplacer l'image</p>
    </div>

    <div class="form-field">
      <label for="content">Contenue</label>
      <textarea class="full-width" id="content" name="content" required><?php echo $data['content'] ?></textarea>
    </div>

    <button type="submit" class="submit btn btn--primary float-right">Mettre à jour</button>
  </form>
<?php $content = ob_get_clean();
require 'template/adminPanel.php';