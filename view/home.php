<?php
$title = "Electicism. - Accueil";
ob_start();

if(!isset($posts)) {
  echo 'Pas de post trouvé :(';
  $content = ob_get_clean();
  require 'template/general.php';
}
?>
  <section class="s-content">
    <div class="row masonry-wrap">
      <div class="masonry">
        <div class="grid-sizer"></div>
        <!-- Display all post -->
        <?php foreach ($posts as $post) {
          require('view/template/homePost.php');
        } ?>
      </div>
    </div>
    </div>
    <!--<div class="row">
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
    </div>-->
  </section>
<?php $content = ob_get_clean();
require 'template/general.php';