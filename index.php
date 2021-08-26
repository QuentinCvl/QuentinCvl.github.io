<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="This website is my online curriculum vitae">
  <meta name="author" content="Quentin Cuvelier">
  <title>Mon CV en ligne</title>

  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.min.css" rel="stylesheet">
  <!-- Custom Fonts -->
  <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
</head>
<body id="page-top" class="index">
<nav id="mainNav" class="navbar navbar-default navbar-fixed-top navbar-custom noBg">
  <div class="container">
    <div class="navbar-header page-scroll">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
              id="mobileNavBtn">
        Menu <i class="fa fa-bars"></i>
      </button>
      <a class="navbar-brand" href="#page-top">Quentin Cuvelier</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li class="hidden">
          <a href="#"></a>
        </li>
        <li class="page-scroll">
          <a href="#portfolio">Portfolio</a>
        </li>
        <li class="page-scroll">
          <a href="#blog">Blog</a>
        </li>
        <li class="page-scroll">
          <a href="#about">à propos</a>
        </li>
        <li class="page-scroll">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Header -->
<header>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div style="height: 100px"></div>
        <div class="intro-text">
          <span class="name">Développeur <br/>d'Application Web</span>
          <hr class="star-light">
          <span class="skills">PHP / Symfony</span>
        </div>
        <div id="cv-content">
          <p>Télécharger mon CV sans attendre !</p>
          <a class="btn btn-primary btn-cv" href="content/CV_Cuvelier_Quentin-min.pdf" role="button" target="_blank">
            <i class="fa fa-download"></i> CV
          </a>
        </div>
      </div>
    </div>
  </div>
</header>

<section id="portfolio" class="secondary">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2>Portfolio</h2>
        <hr class="star-primary">
      </div>
    </div>
    <div class="row">
			<?php
			$project = json_decode(file_get_contents("includes/project.json"), true);
			for($i = 0; $i < count($project); $i++) : ?>
        <div class="col-sm-4 portfolio-item">
          <a href="#portfolioModal<?= $i + 1?>" class="portfolio-link" data-toggle="modal">
            <div class="caption">
              <div class="caption-content">
                <i class="fa fa-search-plus fa-3x"></i>
              </div>
            </div>
            <img src="img/portfolio/<?= $project[$i]["folder"]."/".$project[$i]["img"] ?>" class="img-responsive" alt="">
          </a>
        </div>
			<?php endfor ?>
    </div>
  </div>
</section>

<section class="success" id="about">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2>à propos</h2>
        <hr class="star-light">
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <img src="img/Quentin_WNBG.png" class="img-fluid" alt="Picture of Me">
      </div>
      <div class="col-lg-6 col-lg-offset-1">
        <div class="row">
          <p>Ayant étudié dans nombreux domaines, j'ai eu l'occasion de découvrir plusieurs métiers différents dont
            celui de l'informatique. C'est d'ailleurs celui-ci qui m'a le plus intéressé, c'est pourquoi j'ai décidé de
            poursuivre mes études dans cette voie.</p>
        </div>
        <div class="row">
          <p>Suite à une année à l'université de Valenciennes, je me suis mis à la recherche d'une formation où la
            pratique prime sur la théorie, et me permettant d’allier compétences techniques et professionnelles.</p>
        </div>
        <div class="row">
          <p>C'est pour cette raison que j'ai rejoint la formation Développeur Web proposée par Pop School ! Ne me
            limitant pas au domaine de l'informatique, j'ai également pour passions la nature, les voyages, ainsi que
            l'astronomie.</p>
        </div>
      </div>
      <div class="col-lg-8 text-center">
        <a href="content/CV_Cuvelier_Quentin-min.pdf" class="btn btn-lg btn-outline">
          <i class="fa fa-download"></i> Retrouvez mon CV
        </a>
      </div>
    </div>
  </div>
</section>

<section id="contact" class="secondary">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2>Contactez moi</h2>
        <hr class="star-primary">
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2">
        <form name="sentMessage" id="contactForm" novalidate>
          <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Nom & Prénom</label>
              <input type="text" class="form-control" placeholder="Name" id="name" required
                     data-validation-required-message="Veuillez entrez votre nom.">
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Email</label>
              <input type="email" class="form-control" placeholder="Email Address" id="email" required
                     data-validation-required-message="Veuillez entrez votre addresse email.">
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Tél</label>
              <input type="tel" class="form-control" placeholder="Téléphone" id="phone" required
                     data-validation-required-message="Veuillez renseigner votre numéro.">
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Message</label>
              <textarea rows="5" class="form-control" placeholder="Message" id="message" required
                        data-validation-required-message="Veuillez entrez votre message."></textarea>
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <br>
          <div id="success"></div>
          <div class="row">
            <div class="form-group col-xs-12">
              <button type="submit" class="btn btn-success btn-lg">Envoyer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<footer class="text-center">
  <div class="footer-above">
    <div class="container">
      <div class="row">
        <div class="footer-col col-md-4">
          <h3>Zone géographique</h3>
          <p>Annecy, Haute-Savoie<br>Auvergne-Rhône-Alpes</p>
        </div>
        <div class="footer-col col-md-4">
          <h3>Mes réseaux</h3>
          <ul class="list-inline">
            <li>
              <a href="//github.com/QuentinCvl" class="btn-social btn-outline" title="GitHub">
                <i class="fa fa-fw fa-github"></i>
              </a>
            </li>
            <li>
              <a href="//framagit.org/QuentinCvl" class="btn-social btn-outline" title="Framagit">
                <i class="fa fa-fw fa-gitlab"></i>
              </a>
            </li>
            <li>
              <a href="//linkedin.com/in/quentin-cuvelier/" class="btn-social btn-outline" title="LinkedIn">
                <i class="fa fa-fw fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-col col-md-4">
          <h3>About Freelancer</h3>
          <p>Freelance is a free to use, open source Bootstrap theme created by <a href="http://startbootstrap.com">Start
              Bootstrap</a>.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-below">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          Copyright &copy; Quentin Cuvelier <?php $date =  date('Y');echo $date . '-' . ((int)$date + 2) ?>
        </div>
      </div>
    </div>
  </div>
</footer>

<div class="scroll-top page-scroll hidden-sm hidden-xs hidden-lg hidden-md">
  <a class="btn btn-primary" href="#page-top">
    <i class="fa fa-chevron-up"></i>
  </a>
</div>

<!-- Portfolio Modals -->
<?php for($i = 0; $i < count($project); $i++) : ?>
<div class="portfolio-modal modal fade" id="portfolioModal<?= $i + 1 ?>" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-content">
    <div class="close-modal" data-dismiss="modal">
      <div class="lr">
        <div class="rl">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <div class="modal-body">
            <h2><?= $project[$i]['title'] ?></h2>
            <hr class="star-primary">
            <img src="img/portfolio/<?= $project[$i]["folder"]."/".$project[$i]["img"] ?>" class="img-responsive img-centered" alt="">
            <p><?= $project[$i]["description"] ?></p>
            <ul class="list-inline item-details">
              <li>Techno: <strong><?php foreach($project[$i]['langage'] as $techno) { echo $techno." ";}?></strong>
              </li>
              <li>Date: <strong><?= $project[$i]['date'] ?></strong></li>
              <li>Lien: <strong><a href="<?= $project[$i]['link'] ?>">Voir</a></strong></li>
            </ul>
            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php endfor ?>
<!-- jQuery -->
<script src="vendor/jquery/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!-- Plugin JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<!-- Contact Form JavaScript -->
<script src="js/jqBootstrapValidation.js"></script>
<script src="js/contact.js"></script>
<!-- Theme JavaScript -->
<script src="js/script.min.js"></script>
</body>
</html>
