<?php
$title = "Electicism. - Accueil";
ob_start();
?>
  <section class="s-content">
    <div class="row masonry-wrap">
      <div class="masonry">
        <div class="grid-sizer"></div>
        <!-- Display all post -->
        <?php foreach ($posts as $post) : ?>
          <article class="masonry__brick entry format-standard" data-aos="fade-up">
            <div class="entry__thumb">
              <a href="index.php?page=post&id=<?php echo $post['id'] ?>" class="entry__thumb-link">
                <img src="public/images/<?php echo $post['thumbnail'] ?>" alt="">
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
              <div class="entry__meta">
            <span class="entry__meta-links">
              <a href="category.html">Design</a>
              <a href="category.html">Photography</a>
            </span>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
    </div>
    <div class="row">
      <div class="col-full">
        <nav class="pgn">
          <ul>
            <li><a class="pgn__prev" href="#0">Prev</a></li>
            <li><a class="pgn__num" href="#0">1</a></li>
            <li><span class="pgn__num current">2</span></li>
            <li><a class="pgn__num" href="#0">3</a></li>
            <li><a class="pgn__num" href="#0">4</a></li>
            <li><a class="pgn__num" href="#0">5</a></li>
            <li><span class="pgn__num dots">…</span></li>
            <li><a class="pgn__num" href="#0">8</a></li>
            <li><a class="pgn__next" href="#0">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
<?php $content = ob_get_clean();
require 'template/general.php';