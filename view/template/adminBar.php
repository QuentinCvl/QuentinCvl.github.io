<div id="adminbar">
  <ul class="float-left">
    <li id="adminbar-panel">
      <a class="ab-item" aria-haspopup="true" href="admin/index.php">
        <i class="fa fa-desktop" aria-hidden="true"></i><span>Tableau de bord</span>
      </a>
    </li>
    <?php if (isset($_GET['page']) && $_GET['page'] === "post") : ?>
      <li id="adminbar-panel">
        <a class="ab-item" aria-haspopup="true" href="admin/index.php?page=updateView&id=<?php echo $post['id'] ?>">
          <i class="fa fa-edit" aria-hidden="true"></i><span>Modifier le post</span>
        </a>
      </li>
      <li id="adminbar-panel">
        <a class="ab-item" aria-haspopup="true" href="admin/index.php?page=deletePost&id=<?php echo $post['id'] ?>">
          <i class="fa fa-trash" aria-hidden="true"></i><span>Supprimer le post</span>
        </a>
      </li>
    <?php endif; ?>
  </ul>
  <ul class="float-right ab-top-secondary">
    <li id="adminbar-myaccount" class="menupop with-avatar float-right">
      <a class="ab-item" aria-haspopup="true" href="#">
        <span>Bonjour, <?php echo $_SESSION['user']['username'] ?></span>
        <img src="public/images/avatars/user-05.jpg"
             class="avatar avatar-26 photo" loading="lazy" alt="">
      </a>
      <div class="ab-sub-wrapper">
        <ul id="adminbar-useractions" class="ab-submenu">
          <li id="adminbar-userinfo">
            <a class="ab-item" tabindex="-1" href="admin/index.php">
              <img src="public/images/avatars/user-05.jpg"
                   class="avatar avatar-64 photo" loading="lazy" alt="">
              <span class="display-name"><?php echo $_SESSION['user']['username'] ?></span>
            </a>
          </li>
          <li id="wp-admin-bar-edit-profile">
            <a class="ab-item" href="index.php?page=profile">Modifier le profil</a>
          </li>
          <li id="wp-admin-bar-logout">
            <a class="ab-item" href="index.php?page=disconnect">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>