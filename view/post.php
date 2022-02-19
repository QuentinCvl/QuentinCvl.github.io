<?php
if (!isset($post) || !is_array($post)) {
  header('Location: index.php');
  exit();
}
$title = "Electicism. - Post";
ob_start();
if(!isset($_SESSION)) session_start();
?>
  <section class="s-content s-content--narrow s-content--no-padding-bottom">
    <article class="row format-standard">
      <div class="s-content__header col-full">
        <h1 class="s-content__header-title">
          <?php echo $post['title'] ?>
        </h1>
        <ul class="s-content__header-meta">
          <li class="date"><?php
            setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
            echo strftime("%d %B %Y", strtotime($post['createdThe']));
            ?></li>
        </ul>
      </div>

      <div class="s-content__media col-full">
        <div class="s-content__post-thumb" style="text-align: center">
          <img src="public/images/post/<?php echo $post['thumbnail'] ?>"
               sizes="(max-width: 2000px) 100vw, 2000px" alt="">
        </div>
      </div>

      <div class="col-full s-content__main">

        <?php
        $content = explode("\n", $post['content']);
        foreach ($content as $key => $ctt) {
          if (trim($ctt)) {
            if ($key === 0) { ?>
              <p class="lead"><?php echo $ctt ?></p>
            <?php } else { ?>
              <p><?php echo $ctt ?></p>
            <?php }
            $array[] = $ctt;
          }
        }
        ?>

        <!-- Author information -->
        <div class="s-content__author">
          <img src="public/images/avatars/user-03.jpg" alt="">
          <div class="s-content__author-about">
            <h4 class="s-content__author-name">
              <a href="#0"><?php echo $owner['username'] ?></a>
            </h4>

            <p><?php echo $owner['bio'] ?: '' ?></p>
          </div>
        </div>
      </div>
    </article>

    <!-- list of comments -->
    <div class="comments-wrap">
      <div id="comments" class="row">
        <div class="col-full">
          <h3 class="h2"><?php
            $count = 0;
            foreach ($comment as $com) {
              if ($com['validated']) {
                $count++;
              }
            }
            echo $count . " Commentaire" . ($count > 1 ? "s" : "")
            ?>
          </h3>

          <!-- commentlist -->
          <ol class="commentlist">
            <?php foreach ($comment as $com) {
              if ($com['validated'] || (isset($_SESSION['user']) && !empty($_SESSION['user']))) : ?>
                <li class="depth-1 comment" <?php if(!$com['validated']) echo 'style="background-color: lightgray"'?>>
                  <div class="comment__avatar">
                    <img width="50" height="50" class="avatar" src="public/images/avatars/noAvatar.png" alt="">
                  </div>
                  <div class="comment__content">
                    <div class="comment__info">
                      <cite><?php echo $com['username'] ?></cite>
                      <div class="comment__meta">
                        <time class="comment__time"><?php
                          echo strftime("%d %B %Y", strtotime($com['publishedThe']))
                          ?>
                        </time>
                      </div>
                    </div>

                    <div class="comment__text">
                      <p><?php echo $com['message'] ?></p>
                    </div>
                  </div>
                  <?php if (isset($_SESSION['user']) && !empty($_SESSION['user'])) : ?>
                    <form action="admin/index.php?page=adminComment" method="post">
                      <input type="hidden" value="<?php echo $com['id'] ?>" name="commID">
                      <input type="hidden" value="<?php echo $post['id'] ?>" name="postID">
                      <?php if (!$com['validated']) : ?>
                        <button type="submit" name="valid" class="btn btn-link adminCommentBtn validate">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                      <?php endif; ?>
                      <button type="submit" name="delete" class="btn btn-link adminCommentBtn delete">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </form>
                  <?php endif; ?>
                </li>
              <?php endif;
            } ?>
          </ol>

          <!-- Comment form
          ================================================== -->
          <div class="respond">
            <h3 class="h2">Ajouter un commentaire</h3>

            <form name="contactForm" id="contactForm" method="post" action="index.php?page=createComment">
              <fieldset>
                <div class="form-field">
                  <input name="cName" type="text" id="cName" class="full-width"
                         placeholder="Votre nom" style="color: black"
                         value="<?php echo $_SESSION['user']['username'] ?? '' ?>" <?php echo isset($_SESSION['user']['username']) ? 'readonly' : '' ?>>
                </div>

                <div class="message form-field">
                  <textarea name="cMessage" id="cMessage" class="full-width"
                            placeholder="Votre message" style="color: black"></textarea>
                </div>

                <input type="hidden" name="postID" value="<?php echo $post['id'] ?>">
                <button type="submit" class="submit btn--primary btn--large full-width">Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
<?php
$content = ob_get_clean();
require 'template/general.php';