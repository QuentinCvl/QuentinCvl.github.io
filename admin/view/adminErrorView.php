<?php
$title = "Electicism. - Erreur";
ob_start();

if (!isset($errorMsg)) {
  $errorMsg = 'Pas de message d\'erreur à afficher :(';
}
?>
  <section class="s-content s-content--narrow" style="background: #19191b">
    <div class="row">
      <div class="col-md-12 full-width align-center">
        <div class="error-template">
          <h1 style="color: white">Une erreur c'est produite :</h1>
          <div class="error-details">
            <?php echo $errorMsg ?>
          </div>
          <div class="error-actions">
            <a href="index.php" class="btn">
              Retour
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
<?php $content = ob_get_clean();
require 'template/adminPanel.php';
