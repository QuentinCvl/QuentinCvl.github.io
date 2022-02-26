<section class="s-extra">
  <div class="row top">
    <div class="col-eight md-six tab-full popular">
      <h3>Publications populaire</h3>
      <div class="block-1-2 block-m-full popular__posts">
        <?php
        setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
        if(empty($_SESSION['pop'])) { ?>
          <p>Rien a afficher pour le moment. Revenez plus tard !</p>
        <?php }
        foreach ($_SESSION['pop'] as $pop) : ?>
          <article class="col-block popular__post">
            <a href="index.php?page=post&id=<?php echo $pop['id'] ?>" class="popular__thumb">
              <img src="public/images/post/<?php echo $pop['thumbnail'] ?>" alt="">
            </a>
            <h5><a href="index.php?page=post&id=<?php echo $pop['id'] ?>"><?php echo $pop['title'] ?></a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>Par</span> <a href="#0"> <?php echo $pop['username'] ?></a></span>
              <span class="popular__date"><span>le</span>
                <time datetime="<?php echo $pop['createdThe'] ?>"><?php echo strftime("%d %B %Y", strtotime($pop['createdThe']));?></time></span>
            </section>
          </article>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="col-four md-six tab-full about">
      <h3>Notre Philosophie :</h3>
      <p>
        Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id
        orci porta dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut
        lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
      </p>
      <ul class="about__social">
        <li>
          <a href="#0"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        </li>
        <li>
          <a href="#0"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
        </li>
      </ul>
    </div>
  </div>
</section>
