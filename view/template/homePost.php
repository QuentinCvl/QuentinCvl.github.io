<article class="masonry__brick entry format-standard">
  <div class="entry__thumb">
    <a href="index.php?page=post&id=<?php echo $post['id'] ?>" class="entry__thumb-link">
      <img src="public/images/post/<?php echo $post['thumbnail'] ?>" alt="">
    </a>
  </div>

  <div class="entry__text">
    <div class="entry__header">
      <div class="entry__date">
        <a href="index.php?page=post&id=<?php echo $post['id'] ?>"><?php
          setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
          echo strftime("%d %B %Y", strtotime($post['createdThe']));
          ?></a>
      </div>
      <h1 class="entry__title">
        <a href="index.php?page=post&id=<?php echo $post['id'] ?>"><?php echo $post['title'] ?></a>
      </h1>
    </div>
    <div class="entry__excerpt">
      <p><?php
        $extract = $post['content'];
        if (strlen($extract) > 220) { //If content length > 220, cut at 220 and add ...
          $extract = substr($extract, 0, 220);
        }
        echo $extract . '...';
        ?></p>
    </div>
    <!--<div class="entry__meta">
      <span class="entry__meta-links">
        <a href="category.html">Design</a>
        <a href="category.html">Photography</a>
      </span>
    </div>-->
  </div>
</article>
