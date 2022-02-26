<?php
$title = "Electicism. - Contact";
ob_start();
?>
<section class="s-content s-content--narrow">
  <div class="row">

    <div class="s-content__header col-full">
      <h1 class="s-content__header-title">Feel Free To Contact Us.</h1>
    </div>

    <div class="s-content__media col-full">
      <div id="map-wrap">
        <div id="map-container"></div>
        <div id="map-zoom-in"></div>
        <div id="map-zoom-out"></div>
      </div>
    </div>

    <div class="col-full s-content__main">
      <p class="lead">Lorem ipsum Deserunt est dolore Ut Excepteur nulla occaecat magna occaecat Excepteur nisi esse
        veniam dolor consectetur minim qui nisi esse deserunt commodo ea enim ullamco non voluptate consectetur minim
        aliquip Ut incididunt amet ut cupidatat.</p>

      <p>Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu
        exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit
        commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non
        laborum adipisicing aliqua ea nisi sint ut quis proident ullamco ut dolore culpa occaecat ut laboris in sit
        minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi
        non ut enim aliqua laborum mollit quis nostrud sed sed.
      </p>

      <div class="row">
        <div class="col-six tab-full">
          <h3>Where to Find Us</h3>
          <p>1600 Amphitheatre Parkway<br>
            Mountain View, CA<br>
            94043 US
          </p>
        </div>
        <div class="col-six tab-full">
          <h3>Contact Info</h3>
          <p>contact@eclecticism.com<br>
            info@eclecticism.com<br>
            Phone: (+1) 123 456
          </p>
        </div>
      </div>

      <h3>Dite nous bonjour.</h3>

      <form name="cForm" id="cForm" method="post" action="">
        <fieldset>
          <div class="form-field">
            <input name="cName" type="text" id="cName" class="full-width" placeholder="Nom" value="">
          </div>

          <div class="form-field">
            <input name="cEmail" type="text" id="cEmail" class="full-width" placeholder="Adresse email" value="">
          </div>

          <div class="message form-field">
            <textarea name="cMessage" id="cMessage" class="full-width" placeholder="Message"></textarea>
          </div>

          <button type="submit" class="submit btn btn--primary full-width">Envoyer</button>
        </fieldset>
      </form>
    </div>
  </div>
</section>
<?php $content = ob_get_clean();
require 'template/general.php';
