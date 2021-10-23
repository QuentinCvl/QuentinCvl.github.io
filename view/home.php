<?php
$title = "Electicism. - Accueil";
ob_start();
?>
  <section class="s-content">
    <div class="row">
      <!-- Display all post -->
      <?php
      print_r($posts);
      ?>
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