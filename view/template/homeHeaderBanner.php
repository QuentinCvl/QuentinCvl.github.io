<div class="pageheader-content row">
  <div class="col-full">
    <div class="featured">
      <?php $i=0;
      if(empty($_SESSION['fav'])) { ?>
        <div class="featured__column featured__column--big">
          <div class="entry" style="background-image:url('public/images/vide.png');">
            <div class="entry__content">
              <h1>
                <a href="#" title="">Aucun Post pour le moment</a>
              </h1>
            </div>
          </div>
        </div>
      <?php }
      foreach ($_SESSION['fav'] as $fav) : ?>
      <div class="featured__column featured__column--<?php echo $i === 0 ? 'big' : 'small' ?>">
        <div class="entry" style="background-image:url('public/images/post/<?php echo $fav['thumbnail'] ?>');">
          <div class="entry__content">
            <h1>
              <a href="index.php?page=post&id=<?php echo $fav['id'] ?>" title=""><?php echo $fav['title'] ?></a>
            </h1>
            <div class="entry__info">
              <a href="index.php?page=post&id=<?php echo $fav['id'] ?>" class="entry__profile-pic">
                <img class="avatar" src="public/images/avatars/user-03.jpg" alt="">
              </a>
              <ul class="entry__meta">
                <li><a href="index.php?page=post&id=<?php echo $fav['id'] ?>"><?php echo $fav['username'] ?></a></li>
                <li><?php echo strftime("%d %B %Y", strtotime($fav['createdThe'])) ?></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <?php $i++;endforeach; ?>
    </div>
  </div>
</div>
