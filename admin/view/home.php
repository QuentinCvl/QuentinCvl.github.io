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
    <form id="createPostForm" class="adminForm" name="createPost" method="post" action="index.php?page=createPost"
          enctype="multipart/form-data">
      <h2>Panel Administrateur<br>Création de post</h2>

      <div class="form-field">
        <label for="title">Titre</label>
        <input type="text" class="full-width" id="title" name="title" autocomplete="off" required>
      </div>

      <div class="form-field">
        <label for="thumbnail">Image</label>
        <input type="file" class="full-width" id="thumbnail" name="thumbnail"
               accept=".jpg, .jpeg, .png, .gif" required>
      </div>

      <div class="form-field">
        <label for="content">Contenue</label>
        <textarea class="full-width" id="content" name="content" required></textarea>
      </div>

      <button type="submit" class="submit btn btn--primary float-right">Créer</button>
    </form>
<?php $content = ob_get_clean();
require 'template/adminPanel.php';
