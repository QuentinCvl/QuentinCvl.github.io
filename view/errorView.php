<?php
$title = "Electicism. - Erreur";
ob_start();

if (!isset($errorMsg)) {
  $errorMsg = 'Pas de message d\'erreur à afficher :(';
}
?>
  <section class="s-content s-content--narrow">
    <div class="row">
      <div class="col-md-12 full-width align-center">
        <div class="error-template">
          <h1>Oops ! Une erreur c'est produite ! =(</h1>
          <div class="error-details">
            Désolé ! <?php echo $errorMsg ?>
          </div>
          <div class="error-actions">
            <a href="index.php" class="btn">
              Retour a l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
<?php $content = ob_get_clean();
require 'template/general.php';
